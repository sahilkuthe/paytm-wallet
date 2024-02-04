const express = require("express")
const mongoose = require("mongoose")
const {Account, User} = require("../db");
const { authMiddleware } = require("../middleware");

const router = express.Router();


//to get account balance of the user
router.get("/balance", authMiddleware, async (req, res) => {
    const userAccount = await Account.findOne({
        userId: req.userId
    })
    // const username = await User.findOne({_id: req.userId});
    res.json({
        // username: username.firstName,
        balance: userAccount.balance
    })
    
});

//endpoint for user to transfer money to another account
router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    //using session we can improve the code so that even if one transaction fails the whole transaction is aborted or something like that...

    session.startTransaction();
    const {amount, to} = req.body;      //get the amount and userid of the account to send money

    const account = await Account.findOne({       //this will get us users account
        userId: req.userId
    }).session(session);

    if(!account || account.balance < amount){
        await session.abortTransaction();
        res.status(400).json({
            message: "Insufficient funds"
        })
    }
    
    const toAccount = await Account.findONe({       //to check the validity of account
        userId: to
    }).session(session);


    if(!toAccount){
        await session.abortTransaction();
        res.status(400).json({
            message: "Invalid account"
        })
    }

    await Account.updateOne({
        userId: req.userId
    }, {
        $inc: {
            balance: -amount
        }
    }).session(session);

    
    await Account.updateOne({
        userId: to
    }, {
        $inc: {
            balance: amount
        }
    }).session(session);

    //now commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successfull!"
    })
})







module.exports = router;