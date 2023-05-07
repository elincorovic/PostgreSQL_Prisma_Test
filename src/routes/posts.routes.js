const express = require("express")
let router = express.Router()

const postControllers = require("../controllers/posts.controllers")

router.get("/:id", postControllers.getPostById)

router.post("/", postControllers.createPost)

router.delete("/:id", postControllers.deletePost)

router.get("/:id/likes", postControllers.getLikesByPostId)

router.post("/:id/like", postControllers.likePost)

router.post("/:id/unlike", postControllers.unlikePost)

module.exports = router