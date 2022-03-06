const express = require("express")
const router = express.Router({
  mergeParams : true
})
const {Like} = require("../handlers/likeHandler")
router.put("/",Like)

module.exports = router