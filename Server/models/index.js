const mongoose = require("mongoose");
mongoose.set("debug",true);
// So we can use async and promises instead of callback function
mongoose.Promise = Promise;

mongoose.connect("mongodb://mongo_1:27017,mongo_2:27017,mongo_3:27017/?authSource=admin",{
    keepAlive : true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>console.log("CONNECTION TO MONGO CONTAINER WAS SUCCESFULL !!!")).catch((err)=>console.log("CONNECTION FAILURE MONGO",err))


module.exports.User = require("./user")
module.exports.Message = require("./message")
module.exports.Comment = require("./comment")

