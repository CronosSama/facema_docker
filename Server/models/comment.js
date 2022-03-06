const mongoose = require("mongoose")
// this is the best solution , import the index file that export all models
// and call them with db.User db.Comments db.Message 
// better that importing each one seperately 

const db = require("./index")
const commentSchema = new mongoose.Schema({
    text : {
        type : String,
        required : "You need to write something "
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    Message : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Message"
    },
    Likes : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    ]
})


commentSchema.pre("remove",async function(next){
    try {
        // Deleting a Comment 
        const foundUser = await db.User.findById({_id : this.user})
        const foundMessage = await db.Message.findById({_id:this.Message})
        foundUser.Comments.remove(this.id)
        foundMessage.Comments.remove(this.id)
        await foundUser.save()
        await foundMessage.save()
        return next()
        
    } catch (err) {
        return next(err)
    }

})

const Comment = mongoose.model("Comment",commentSchema)

module.exports = Comment