const express = require("express")

const router = express.Router();
const userRouter = "./routes/user.js"
app.use("/user", userRouter);





module.exports = router;