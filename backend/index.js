require('dotenv').config()
// import notes from './example.json' assert {type: 'json'};
const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose  = require('mongoose')

const projectsRouter = require('./router/projects')
const usersRouter = require('./router/users')
const donationRouter = require('./router/donates')

app.use((req, res, next) => {
  if (req.originalUrl === '/api/donates/webhook') {
    next(); // Do nothing with the body because I need it in a raw state.
  } else {
    express.json()(req, res, next);  // ONLY do express.json() if the received request is NOT a WebHook from Stripe.
  }
});

app.use(cors()) // to be able to handle post from other port
app.use(express.urlencoded({ extended: true})) // to be able to receive data
app.use(express.static('public'))

app.use('/api/projects', projectsRouter)
app.use('/api/users', usersRouter)
app.use('/api/donates', donationRouter)

// Cloud Atlas
const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect(process.env.DATABASE_URL, connectionParams)

// Local db
// mongoose.connect(process.env.LOCAL_DATABASE_URL)

.then( () => {
  console.log('Connected to the database ')
})
.catch( (err) => {
    console.error(`Error connecting to the database. n${err}`);
})

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`v0.0.2: Server running on port ${PORT}: ${process.env.BE_URL}`);
  
});
