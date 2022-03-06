require("dotenv").config()
const version = process.version
// Declaring Variables and requiring modules
const express = require("express");
const app = express();
const cors = require("cors")
const bodyParser = require("body-parser")
const chalk = require("chalk")
const Auth = require("./routes/Auth")
const PORT = 3001
const Error_Handler = require("./handlers/error_handler")
const {Authentification,AuthorizationComments,AuthorizationMessages,AuthorizationLike} = require("./middleware/auth")
const Messages = require('./routes/messages')
const Comments = require("./routes/comments")
const Likes = require("./routes/likesRoutes")
const db = require("./models")

// Middlewere 
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
//Start of All Routes 
app.use("/api/Auth",Auth)
app.use("/api/user/:user_id/messages",Authentification,AuthorizationMessages,Messages)
// you need to make new authorization 
app.use("/api/user/:user_id/messages/:message_id/comments",Authentification,AuthorizationComments,Comments)

app.use("/api/user/:user_id/content/:content_id/Like",Authentification,AuthorizationLike,Likes)
// GET ALL MESSAGES
app.get("/api/messages",Authentification,async (req,res,next)=>{
    try{
    const foundMessages = await db.Message.find().sort({createdAt: "desc" }).populate("user",{
        username : true,
        profileImg : true
    }).populate({
        path : 'Comments',
        populate : {
            path : 'user',
            select : ["username","profileImg"],
            
        },
    })
    // .populate({}
    //     path : "Likes",
    //     select : "_id",
    //     populate : {
    //         path : "user",
    //         select : "username"
    //     }
    // })


    res.status(200).json(foundMessages)
    }catch(err){
        return next(err)
    }
})

//modify the Password :
//End of All Routes

// return Error if the Route is not found !!!
app.use((req,res,next)=>{
    let err = new Error("Not Found !!")
    err.status = 404
    return next(err)
})


app.use(Error_Handler)

app.listen(process.env.PORT,()=>{
    console.log(chalk.yellow.bgBlack(`Server is Running in Port ${process.env.PORT}`))
})