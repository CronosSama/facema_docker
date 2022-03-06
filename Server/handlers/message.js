const db = require("../models")
//prefix : api/user/user_id/messages
exports.createMessage = async(req,res,next)=>{
    try {
        //Create A Message 
         // Fixed that you can create a Message/Comment with non exisiting or not owned user id
        // by searching for the User first and if it exist we will add it to the Message
        const User = await db.User.findById(req.params.user_id)

        const message = await db.Message.create({
            text : req.body.text,
            user : User._id
        })
        // Push it to that user Messages Array field
        User.Messages.push(message.id)
        // Save
        await User.save()

        // Populate the Message
        const foundMessage = await db.Message.findById(message.id).populate("user",{
            username : true,
            profileImg : true
        })
        // Response
        res.status(200).json(foundMessage)

    }catch(err){
        return next(err)
    }
}


//api/user/user_id/messages/message_id

exports.getMessage = async(req,res,next)=>{
    try{
        const foundMessage = await db.Message.findById(req.params.message_id)

        res.status(200).json(foundMessage)
    }catch(err){
        return next(err)
    }
}
//api/user/user_id/messages/message_id

exports.deleteMessage = async(req,res,next)=>{
    try{
        const foundMessage = await db.Message.findById(req.params.message_id)
        await foundMessage.remove()
        return res.status(200).json(foundMessage)
        
    }catch(err){
        return next(err)
    }
}
//api/user/user_id/messages/message_id

exports.modifyMessage = async(req,res,next)=>{
try {
    //fixed the ability of someone to change the owner of the post by only accepting the text field
    const newMessage = await db.Message.findByIdAndUpdate({_id:req.params.message_id},{text:req.body.text},{new:true}).populate("user",{
        username : true,
        profileImg : true
    }).populate({
        path : 'Comments',
        populate : {
            path : 'user',
            select : ["username","profileImg"],
            
        },
    })
    res.status(200).json(newMessage)
} catch (err) {
    return next(err)    
}
}
