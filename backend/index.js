const express = require("express");
const cors = require("cors");


const app = express();
const mainRouter = "./routes/index.js"



app.use(cors()); //cross origin resource sharing for security
app.use(express.json());   //instead of bodyparser used this to read the body of an http request
app.use("/api/v1", mainRouter);

app.listen(3000)

