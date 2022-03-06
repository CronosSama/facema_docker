const mongoose = require("mongoose")
const db = require("./index")
const messageSchema = new mongoose.Schema({
    text:{
        type : String,
        maxlength : 160,
        required : "Please Put Some Text !!"
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    Comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Comment"
        }
    ],
    Likes : [{type:String}]
},{
    timestamps : true
});

messageSchema.pre("remove",async function(req,res,next){
    // Delete The Id of the Message from the User model Messages Array field
    try  {
        //find the user that have this Message
        let the_user = await db.User.findById(this.user)
        console.log(the_user)
        this.Comments.map(async(el)=>{
            await the_user.Comments.remove(el)
            await db.Comment.findByIdAndDelete(el)
        })
        //Go to The Messages Array Field in this user Class and remove the id of the message 
        //remove work like pop
        the_user.Messages.remove(this.id)
        //Save
        await the_user.save()

        
        return next()
    } catch(err){
        return next(err)
    }
})


const Message = mongoose.model("Message",messageSchema)


module.exports = Message