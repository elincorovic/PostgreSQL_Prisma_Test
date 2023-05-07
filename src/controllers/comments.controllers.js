let prisma = require("../../db")

let controllers = {}

controllers.getCommentsByPostId = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        let comments = await prisma.comment.findMany({
            where: {
                post_id: id
            }
        })
        res.send(comments)
    } catch (error) {
        res.send(error.message)
    }
}

controllers.deleteComment = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        await prisma.comment.delete({
            where: {
                id: id
            }
        })
        res.send("Comment successfully deleted")
    } catch (error) {
        res.send(error.message)
    }
}

controllers.createComment = async (req, res) => {
    try {
        const {content, post_id, user_id} = req.body
        await prisma.comment.create({
            data: {
                content: content,
                post_id: parseInt(post_id),
                user_id: parseInt(user_id)
            }
        })
        res.send("Comment successfully created")
    } catch (error) {
        res.send(error.message)
    }
}

module.exports = controllers