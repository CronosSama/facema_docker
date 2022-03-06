const db = require("../models")
const jwt = require("jsonwebtoken")
const {hashing} = require("../helpers/Hashing")

exports.singup = async(req,res,next)=>{
    try
        {    
            console.log(req.body)
            const user = await db.User.create(req.body)
            let { id,username,profileImg } = user

            const token = jwt.sign({
                id,
                username,
                profileImg
            },process.env.SECRET_KEY)

            return res.status(200).json({
                id,
                username,
                profileImg,
                token
        })
    }
    catch(err)
        {
            if(err.code === 11000){
                err.message = "Sorry the Email/Username is taken !!"
            }
            return next({status:400,message:err.message})
    }

}

exports.signin = async function(req,res,next){
    try {
        let user = await db.User.findOne({email :req.body.email})
        const isMatch = await user.comparePassword(req.body.password)
        if(isMatch){
            let {id,username,profileImg} = user
            const token = jwt.sign({
                id,
                username,
                profileImg
            },process.env.SECRET_KEY)
            res.status(200).json({
                id,
                profileImg,
                username,
                token
            })
        }
        else {
            return next({
                status:400,
                message:"Invalid Email/Password"
            })
        }
    }catch(err){
        return next({
            status:400,
            message:"Invalid Email/Password"
        })
    }


}

exports.getUser = async (req,res,next)=>{
    try {
        const foundUser = await db.User.findById(req.params.user_id).populate("Messages",{
            text : true,
            user : true
        })

        res.status(200).json(foundUser)
        
    } catch (err) {
        return next(err)
    }
}
// prefix = /api/Auth/user/:user_id
exports.modifyUser = async(req,res,next)=>{
    try {
        const foundUser = await db.User.findById(req.params.user_id)
        const isMatch = await foundUser.comparePassword(req.body.oldP)
        if(isMatch){

            const change = {}
            if(req.body.username && req.body.username != foundUser.id){
                change["username"] = req.body.username
            }

            if((req.body.newP && req.body.renew) && req.body.newP === req.body.renew) {
                let {password,salt} = await hashing(req.body.newP)
                change["password"] = password
                change["salt"] = salt
            }

            else if (!req.body.newP === req.body.renew) {
                    return next({
                        status:400,
                        message : "passwords does not match !!"
                    })
                }
                let changed = await db.User.findByIdAndUpdate({_id:req.params.user_id},change,{new:true})
                
                res.status(200).json(changed)

            }


        else{
            return next({
                status:400,
                message:"Invalid Password"
            })
        }
        
    } catch (err) {
        return next({
            status:400,
            message:"Invalid Password Big"
        })
    }
}