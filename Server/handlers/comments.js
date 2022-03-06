const db = require("../models")


// prefix - /api/user/:user_id/messages/:message_id/comments
exports.createComment = async(req,res,next)=>{
    try {
        // Fixing that you can create a Message/Comment with non exisiting or not owned user id
        // by searching for the User And the Message first and if they exist we use theres id to fill the addComment
        const foundUser =  await db.User.findById(req.params.user_id)
        const foundMessage =  await db.Message.findById(req.params.message_id)


        const addComment = await db.Comment.create({
            text : req.body.text,
            user : foundUser._id,
            Message : foundMessage._id
        })
        
        foundUser.Comments.push(addComment.id)
        foundMessage.Comments.push(addComment.id)
        await foundUser.save()
        await foundMessage.save()
        // so i can populate it
        const foundComment = await db.Comment.findById(addComment.id).populate(
            {
                path : "user",
                select : ["username","profileImg"]
            }
        )
        res.status(200).json(foundComment)


    } catch (err) {
        return next(err)
    }
}
// prefix - /api/user/:user_id/messages/:message_id/comments/:comment_id

exports.ModifyComment = async(req,res,next)=>{
    try {
        //fixed the ability of someone to change the owner of the post by only accepting the text field
        const foundComment = await db.Comment.findByIdAndUpdate({_id:req.params.comment_id},{text:req.body.text},{new : true}).populate("user",{
            username : true,
            profileImg : true
        })
        res.status(200).json(foundComment)
        
    } catch (err) {
        return next(err)
    }
    
}

// prefix - /api/user/:user_id/messages/:message_id/comments/:comment_id

exports.deleteComment = async(req,res,next)=>{
    try {
        const foundComment = await db.Comment.findById(req.params.comment_id)
        await foundComment.remove()
        res.status(200).json(foundComment)
    } catch (err) {
        return next(err)
        
    }
}