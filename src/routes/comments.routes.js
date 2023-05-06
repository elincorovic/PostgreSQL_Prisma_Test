const express = require("express")
let router = express.Router()

const commentControllers = require("../controllers/comments.controllers")

router.get("/:id", commentControllers.getCommentsByPostId)

router.post("/", commentControllers.createComment)

router.delete("/:id", commentControllers.deleteComment)

module.exports = router