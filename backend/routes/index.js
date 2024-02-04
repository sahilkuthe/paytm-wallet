const express = require("express")

const router = express.Router();

const userRouter = require("./user.js")
const accountRouter = require("./accounts.js")

router.use("/user", userRouter);
router.use("/account", accountRouter);




module.exports = router;