const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: String,
    Technology: String
},{ timestamps: true, versionKey: false, collection: "user" });

const User = mongoose.model("User" ,  UserSchema);
module.exports = { User }