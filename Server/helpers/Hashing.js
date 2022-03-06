const crypto = require("crypto")
const util = require("util")
const scrypto = util.promisify(crypto.scrypt)

module.exports.hashing = async function(input_password,next){
    try
        {        

        let salt = crypto.randomBytes(8).toString("hex")

        let hashed_password = await scrypto(input_password,salt,64).then(h=>h.toString("hex"))
        const password = hashed_password
        return {
            password,
            salt
        }
        }
    catch(err){
            return next({err})
        }    
    
}

module.exports.compare = async function(input_password,salt,password,next){
    try{
        
        //hash the input password using the salt of this user
        let hashed_password = await scrypto(input_password,salt,64).then(hashed=>hashed.toString("hex"))

        //compare it with the one in the DB
        let isMatch = password === hashed_password

        console.log(isMatch)
        return isMatch
    }catch(err){
        return next(err)
    } }


    module.exports.hashingM = async function(input_password,next){
        try
            {        
    
            let salt = crypto.randomBytes(8).toString("hex")
    
            let hashed_password = await scrypto(input_password,salt,64).then(h=>h.toString("hex"))
            const password = hashed_password
            return {
                password,
                salt
            }
            }
        catch(err){
                return next({err})
            }    
        
    }
    