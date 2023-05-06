const express = require("express")
let router = express.Router()

const userControllers = require("../controllers/users.controllers")

router.get("/", userControllers.getUsers)

router.get("/:id", userControllers.getUserById)

router.post("/", userControllers.createUser)

router.delete("/:id", userControllers.deleteUser)

router.post("/follow", userControllers.follow)

router.post("/unfollow", userControllers.unfollow)

router.get("/:id/posts", userControllers.getPostsByUserId)

module.exports = router