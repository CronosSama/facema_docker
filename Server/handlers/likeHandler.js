const db = require("../models")

exports.Like = async(req,res,next) => {
  try {
    
    const foundUser = await db.User.findById(req.params.user_id)

    if(req.body.cType === "Message"){
      var foundContent = await db.Message.findById(req.params.content_id)

    }else if (req.body.cType === "Comment"){
      var foundContent = await db.Comment.findById(req.params.content_id)
    }
    
    const LikedIt = foundContent.Likes.includes(foundUser._id)

    LikedIt ? foundContent.Likes.remove(foundUser._id) : foundContent.Likes.push(foundUser._id)

    await foundContent.save()

    res.status(200).json(foundUser._id)
  
    
  } catch (error) {
    return next(error)
  }
}


