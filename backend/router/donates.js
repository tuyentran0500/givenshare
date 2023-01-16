const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
// This is your test secret API key.
const stripeKey = process.env.STRIPE_SECRET_KEY
// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
const stripe = require('stripe')(stripeKey);
const FE_URL = process.env.FE_URL ?? 'http://localhost:3000/'

const DonateModel = require("../models/donates")
const ProjectModel = require("../models/projects")

async function postHandler(req, res) {
    const { projectId, userId, amount } = req.body;
    let donation
    if (amount){
        donation = new DonateModel({
            projectId, userId, amount
        })
        try {
            const newDonation = await donation.save();
            const project = await ProjectModel.findById(projectId)
            if (project === null) {
                return res.status(404).json({ message: "Cannot find the project" });
            }
            project.currentProgress += amount
            project.backers.set(userId, (project.backers.get(userId) || 0) + amount)
            project.save()
            res.status(201).json(newDonation)
        } catch (err) {
            res.status(400).json({message: err.message})
        }
    }
    else {
        res.status(400).json({message: "Donate zero?"})
    }
}

async function getHandler(res, next, query) {
    let donation;
    try {
        donation = await DonateModel.find(query);
        if (donation === null){
            return res.status(404).json({ message: "Cannot find the donate" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.donation = donation;
    next();
}

// Get all
router.get("/", async (req, res) => {
    try {
      const donateHistory = await DonateModel.find();
      res.json(donateHistory);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

async function getDonateById(req, res, next) {
    getHandler(res, next, {_id : req.params.id})
}
// Get one
router.get("/:id", getDonateById, (req, res) => {
    res.send(res.donation);
  });
  
// Post new one
router.post("/", postHandler);

// Delete one
router.delete("/:id", getDonateById, async (req, res) => {
    try {
      await res.donation.remove();
      res.json({ message: "Deleted " + res.donation._id });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// Update one (update amount only)
router.patch("/:id", getDonateById, async (req, res) => {
    res.donation.amount = req.body.amount;

    try {
        const updatedDonation = await res.donation.save();
        res.json(updatedDonation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// query by project_id, user_id
async function getDonateByProjectId(req, res, next) {
    getHandler(res, next, {projectId : req.params.id})
}
router.get("/project/:id", getDonateByProjectId, (req, res) => {
    res.send(res.donation);
});
async function getDonateByUserId(req, res, next) {
    getHandler(res, next, {userId : req.params.id})
}
router.get("/user/:id", getDonateByUserId, (req, res) => {
    res.send(res.donation);
});

router.post("/create-checkout-session", async (req, res) => {
    const { projectId, projectTitle, projectCoverURL, userId, amount } = req.body;
    try {
        const session = await stripe.checkout.sessions.create({
            submit_type: 'donate',
            line_items: [
            {
                price_data: {
                    currency: 'JPY', // TODO: USD
                    product_data : {
                        name: `Donate to ${projectTitle}`,
                        images: [projectCoverURL],
                        description: `これはあくまで支払いのシミュレーションであり、どの口座からもお金が請求されるわけではありません。カード番号 4242424242424242 のテストカードを使用し、支払い成功のシミュレーションを行うことができます。
                        (To imitate a successful transaction, utilize a test card with the card number 4242424242424242.)`
                    },
                    unit_amount: amount,
                },
                quantity: 1
            },
            ],
            mode: 'payment',
            // temporary handle response in FE, will use Stripe Webhook after deployment
            success_url: `${FE_URL}/donateHandler?status=success&&projectId=${projectId}&&donatorId=${userId}&&amount=${amount}`,
            cancel_url: `${FE_URL}/projects/${projectId}/?canceled=true`,
        });
        res.send(session.url);
    } catch (err) {
        res.status(400).send({
            message: err.message
         });
    }
    
});

// TODO: not usable yet, need to be publicly accessible.
router.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
    const sig = request.headers['stripe-signature'];
  
    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
        console.log(err.message)
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('payment_intent.succeeded')
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  
    // Return a 200 response to acknowledge receipt of the event
    response.send();
  });
  
module.exports = router;