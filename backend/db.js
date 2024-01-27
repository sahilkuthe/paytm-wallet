import mongoose, { Mongoose, model } from "mongoose";
require('dotenv').config();
mongoose.connect(process.env.MONGO_URL);

//create a monggose schema

const userSchema = new mongoose.Schema({
    firstname: String,
    lastName: String,
    password: String,

})


//create a model of the schema
const User = mongoose.model('User', userSchema);
//export the model
module.exports = {
    User
}