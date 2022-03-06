const mongoose = require("mongoose")
const crypto = require("crypto")
const util = require("util")
const scrypto = util.promisify(crypto.scrypt)
const {hashing,compare} = require("../helpers/Hashing")
const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    username : {
        type: String,
        required : true,
        unique : true
    },
    password : {
        type:String,
        required : true
    },
    salt : {
        type:String
    },
    profileImg : {
        type : String
    },
    Messages : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Message"
        }
    ],
    Comments : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Comment"
        }
    ],
    created_date : {
        type : Date,
        default : Date.now
    }
})



userSchema.pre("save",async function(next){
    try
        {        
        if (!this.isModified("password")){
            return next()
        }
        const {password,salt} = await hashing(this.password)
        this.password = password
        this.salt = salt
        
        return next()
        }
    catch(err){
            return next({err})
        }    
    
})


userSchema.methods.comparePassword = async function(input_password,next){
    try{        
        let isMatch = compare(input_password,this.salt,this.password)
        return isMatch
    }catch(err){
        return next(err)
    }
}





const User = mongoose.model("User",userSchema)



module.exports = User