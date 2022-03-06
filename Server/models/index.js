const mongoose = require("mongoose");
mongoose.set("debug",true);
// So we can use async and promises instead of callback function
mongoose.Promise = Promise;

mongoose.connect("mongodb://mohammed:Tri_201@mongo:27017/?appName=facema&authSource=admin",{
    keepAlive : true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>console.log("CONNECTION TO MONGO CONTAINER WAS SUCCESFULL !!!")).catch((err)=>console.log("CONNECTION FAILURE MONGO"))


module.exports.User = require("./user")
module.exports.Message = require("./message")
module.exports.Comment = require("./comment")

