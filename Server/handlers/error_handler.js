
const Error_Handler = (error,req,res,next)=>{

    return res.status(error.status || 500).json({
        error:{
            message:error.message || "Oops,something went wrong !"
        }
    })
}

module.exports = Error_Handler