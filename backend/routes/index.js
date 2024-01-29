const express = require("express")

const router = express.Router();

const userRouter = require("./user.js   ")
const accountRouter = require("./accounts.js")

app.use("/user", userRouter);
app.use("/account", accountRouter);




module.exports = router;