const express = require("express")
let router = express.Router()

const commentControllers = require("../controllers/comments.controllers")

router.delete("/:id", commentControllers.deleteComment)

module.exports = router