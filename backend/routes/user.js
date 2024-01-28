const express = require("express");
const {User} = require("../db");
const zod = require("zod");
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../config")
const router = express.Router();

const signupBody = zod.object({             //defining a schema for input validation using zod
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})

//signup route, this will take all the user information after zod validation and store it in database
router.post("/signup", async (req, res) => {
    const {success} = signupBody.safeParse(req.body);
    if(!success){                           //check for input errors
        return res.status(411).json({
            message: "email already taken/ incorrect inputs"
        })
    }

    const existingUser = await User.findONe({
        username: req.body.username
    })

    if (existingUser) {         //check for existing user
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const user = await User.create({            //if all checks are passed then create the user using the information obtained from the post request
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    })

    const userId = user._id;        //get the user Id

    const token = jwt.sign({        //create a jwt token
        userId
    }, JWT_SECRET);

    //return json
    res.json({
        message: "user created successfully",
        token: token
    })

})

//zod schema for signin
const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

//post request for signin
router.post("/signin", async (req, res) => {
    const {success} = signinBody.safeParse();
    if(!success){
        return res.status(411).json({
            message: "invalid inputs"
        })
    }

    const user = await User.findONe({       //find user in DB
        username: req.body.username,
        password: req.body.password
    })

    if(user){
        const token = jwt.sign({        //user found then create a jwt token using user._id and jwt secret key
            userId: user._id
        }, JWT_SECRET);

        res.json({
            token: token
        })
        return;
    }
    return res.status(411).json({               
        message: "Error while logging in"
    })


})

module.exports = router