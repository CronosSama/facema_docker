const express = require("express")
const router = express.Router({mergeParams:true})
const { createMessage,getMessage,deleteMessage,modifyMessage } = require("../handlers/message")
router.post("/",createMessage)
router.route("/:message_id").get(getMessage).delete(deleteMessage).put(modifyMessage)
module.exports = router
