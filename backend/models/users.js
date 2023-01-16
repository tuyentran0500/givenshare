const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: {
    type: String, 
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
    require: true,
    default: "https://images4.alphacoders.com/118/thumb-1920-1187146.jpg",
  },
  phone: {
    type: String,
    require: false,
  },
  location: {
    type: String, 
    require: false
  },
  created_date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  biography: {
    type: String, 
    default: "There is no input, but we all know that this is a wonderful user"
  },
  website: {
    type: [{value : String}],
    default: []
  }
});

module.exports = {userSchema: userSchema, UserModel: mongoose.model("User", userSchema)};
