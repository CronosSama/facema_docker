const jwt = require("jsonwebtoken")
const db = require("../models")
module.exports.Authentification = async(req,res,next) => {
    try{
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token,process.env.SECRET_KEY,function(err,decoded){
            if(decoded){
                return next()
            }
            else{
                return next({
                    status : 401,
                    message : "Please Login First !"
                })
            }
    
        })
    }catch(err){
        return next({
            status : 401,
            message : "Please Login First !"
        })
    }

}


module.exports.AuthorizationUser = async(req,res,next) => {
    try{
        const token = req.headers.authorization.split(" ")[1]

        jwt.verify(token,process.env.SECRET_KEY,async function(err,decoded){
            if(decoded && decoded.id === req.params.user_id){
                return next()

            }
            else{
                return next({
                    status : 401,
                    message : "Unauthorized"
                })
            }
    
        })
    }catch(err){
        return next({
            status : 401,
            message : "Unauthorized"
        })
    }

}


module.exports.AuthorizationMessages = async(req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token,process.env.SECRET_KEY,async(err,decoded)=>{
            if(decoded && decoded.id === req.params.user_id){
                if (req.params.message_id){
                    const foundMessage = await db.Message.findById(req.params.message_id)
                    if(foundMessage.user._id == req.params.user_id){
                        res.locals.foundMessage = foundMessage

                        return next()
                    }
                    else {
                        return next({
                            status : 401,
                            message : "Unauthorized"
                        })
                    }
                    
                }
                else {
                    return next()
                } 
            }
            else {
                return next({
                    status : 401,
                    message : "UnAuthorized"
                })
            }
        })
        
    } catch (err) {
        return next({
            status : 401,
            message : "UnAuthorized"
        })
    }
}

module.exports.AuthorizationComments = async(req,res,next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token,process.env.SECRET_KEY,async(err,decoded)=>{
            if(decoded && decoded.id === req.params.user_id){
                if(req.params.comment_id){
                    const foundComment = await db.Comment.findById(req.params.comment_id)
                    if(foundComment.user._id == req.params.user_id){
                        res.locals.Comment = foundComment
                        return next()
                    }
                    else {
                        return next({
                            status : 401,
                            message : "UnAuthorized"
                        })
                    }
                }
                else {
                    return next()
                }
            }
            else {
                return next({
                    status : 401,
                    message : "UnAuthorized"
                })
            }
        })

    } catch (error) {
        return next({
            status : 401,
            message : "UnAuthorized"
        })
    }
}


module.exports.AuthorizationLike = async(req,res,next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token,process.env.SECRET_KEY,async(err,decoded)=>{
            if(decoded && decoded.id === req.params.user_id){
                return next()
            }
            else {
                return next({
                    status : 401,
                    message:  "UnAuthorized"
                })
            }
        })
        
    } catch (error) {
        return next({
            status : 401,
            message:  "UnAuthorized"
        })
    }
}


