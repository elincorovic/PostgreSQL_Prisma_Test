const express = require("express")
let router = express.Router()

const postControllers = require("../controllers/posts.controllers")

router.get("/:id", postControllers.getPostById)

router.post("/", postControllers.createPost)

router.delete("/:id", postControllers.deletePost)

router.get("/:id/likes", postControllers.getLikesByPostId)

router.post("/:id/like", postControllers.likePost)

router.post("/:id/unlike", postControllers.unlikePost)

router.get("/:id/comments", postControllers.getCommentsByPostId)

router.post("/:id/comment", postControllers.createComment)

module.exports = router