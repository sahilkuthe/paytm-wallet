const express = require("express");
const {User, Account} = require("../db");
const zod = require("zod");
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../config")
const {authMiddleware} = require("../middleware")

const router = express.Router();

const signupBody = zod.object({             //defining a schema for input validation using zod
    firstName: zod.string(),
    lastName: zod.string(),
    username: zod.string().email(),
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

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {         //check for existing user
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const user = await User.create({            //if all checks are passed then create the user using the information obtained from the post request
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password
    })

    const userId = user._id;        //get the user Id

    //create a new account with a random balance from 1 to 10000
    await Account.create({
        userId,
        balance: 1+ Math.random()*10000
    })

    const token = jwt.sign({userId}, JWT_SECRET);

    //return json
    res.status(200).json({
        message: "user created successfully",
        token: token
    });

    

});

//zod schema for signin
const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

//post request for signin
router.post("/signin", async (req, res) => {
    const {success} = signinBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "invalid inputs"
        })
    }

    const user = await User.findOne({       //find user in DB
        username: req.body.username,
        password: req.body.password
    })

    if(user){
        const token = jwt.sign({        //user found then create a jwt token using user._id and jwt secret key
            userId: user._id
        }, JWT_SECRET);

        res.json({
            msg: "signin successfull",
            token: token
        })
        return;
    }
    
    return res.status(411).json({               
        message: "Error while logging in"
    })


})

const updateBody = zod.object({
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

router.put("/update", authMiddleware, async (req, res) => {
    const {success} = updateBody.safeParse();
    if(!success){
        res.status(411).json({
            message: "Error while updating the information"
        })
    }
    await User.updatrOne({
        _id: req.userId
    })
    
    res.json({
        message: "Updated successfully"
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";      //if a filter is passed in query then use that filter, else filter = ""
    const users = User.find({        //to filter out using firstname or lastname, $or is a logical OR operator
        $or: [{
            firstName:{
                "$regex": filter        //$regex means regular expression
            }
        },{
            lastName: {
                "$regex": filter
            }
        }]

    })

    res.json({
        user: (await users).map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})




module.exports = router