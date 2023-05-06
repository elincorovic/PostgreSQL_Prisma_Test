const express = require("express")
let router = express.Router()

let likeControllers = require("../controllers/likes.controllers")

router.delete("/:id", likeControllers.deleteLike)

router

module.exports = router