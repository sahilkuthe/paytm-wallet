const express = require("express")
const {Account} = require("../db");
const { authMiddleware } = require("../middleware");

const router = express.Router();


//to get account balance of the user
router.get("/", async (req, res) => {
    const account = await Account.findONe({
        userId: req.userId
    })

    res.json({
        balance: account.balance
    })
});

//endpoint for user to transfer money to another account
router.post("/transfer", authMiddleware, async (req, res) => {
    const {amount, to} = req.body;      //get the amount and userid of the account to send money

    const account = await Account.findONe({       //this will get us users account
        userId: req.userId
    })

    if(account.balance < amount){
        res.status(400).json({
            message: "Insufficient funds"
        })
    }
    
    const toAccount = await Account.findONe({       //to check the validity of account
        userId: to
    })

    if(!toAccount){
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
        
    })

    
    await Account.updateOne({
        userId: to
    }, {
        $inc: {
            balance: amount
        }
        
    })

    res.json({
        message: "Transfer successfull!"
    })
})







module.exports = router;