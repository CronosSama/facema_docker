const express = require("express")
const router = express.Router({
    mergeParams : true
})
const { createComment,ModifyComment,deleteComment } = require("../handlers/comments")
// prefix - /api/user/:user_id/message/:message_id/comments

router.post("/",createComment)
router.route("/:comment_id").put(ModifyComment).delete(deleteComment)

module.exports = router