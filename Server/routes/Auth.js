const express = require("express")
const router = express.Router()
const { singup,signin,getUser,modifyUser } = require("../handlers/auth")
const { Authentification,AuthorizationUser } = require("../middleware/auth")
router.post("/signup",singup)
router.post("/signin",signin)
router.get("/user/:user_id",getUser)
router.put("/user/:user_id",Authentification,AuthorizationUser,modifyUser)

module.exports = router