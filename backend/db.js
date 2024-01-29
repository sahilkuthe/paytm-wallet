import mongoose, { Mongoose, model } from "mongoose";
require('dotenv').config();
mongoose.connect(process.env.MONGO_URL);

//create a monggose schema

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }

})

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    balance: {
        type: Number,
        required: true
    }

});

const Account = mongoose.model('Account', accountSchema);



//create a model of the schema
const User = mongoose.model('User', userSchema);
//export the model
module.exports = {
    User,
    Account
}