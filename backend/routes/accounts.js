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
})







module.exports = router;