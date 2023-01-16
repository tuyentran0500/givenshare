const express = require("express");
const { S3Client } = require('@aws-sdk/client-s3')
const multer = require('multer')
const multerS3 = require('multer-s3')
const router = express.Router();
const { UserModel } = require("../models/users")

// var app = express(),
const s3 = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    sslEnabled: false,
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
  });

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'givenshare',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, "public/uploads/userAvatars/" + Date.now().toString() + "_" + file.originalname)
    }
  })
})
  

async function postHandler(req, res) {
    const {_id, displayName, email, location, phone, photoUrl} = req.body;
    const user = new UserModel({
        _id , displayName, email, location, phone, photoUrl
    })
    try {
        const newUser = await user.save();
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}
async function getUserById(req, res, next) {
    let user;
    try {
        user = await UserModel.findById(req.params.id);
        if (user === null){
            return res.status(404).json({ message: "Cannot find the user" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.user = user;
    next();
}

// Get all
router.get("/", async (req, res) => {
    try {
      const users = await UserModel.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

// Get one
router.get("/:id", getUserById, (req, res) => {
  res.send(res.user)
});

// Post new one
router.post("/", postHandler);

// Delete one
router.delete("/:id", getUserById, async (req, res) => {
    try {
      await res.user.remove();
      res.json({ message: "Deleted " + res.user.name });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
router.post("/uploadAvatar", upload.single('avatar'), async (req, res) => {
    res.json(req.file.location);
})
// Update one
router.patch("/:id", getUserById, async (req, res) => {
    if (req.body.displayName != null) {
        res.user.displayName = req.body.displayName;
    }
    if (req.body.email != null) {
        res.user.email = req.body.email;
    }
    if (req.body.biography != null) {
        res.user.biography = req.body.biography;
    }
    if (req.body.website != null) {
        res.user.website = req.body.website;
    }
    if (req.body.photoUrl != null) {
        res.user.photoUrl = req.body.photoUrl;
    }
    res.user.phone = req.body.phone;
    res.user.location = req.body.location;
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;