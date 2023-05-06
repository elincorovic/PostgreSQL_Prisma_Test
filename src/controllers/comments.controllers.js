let pool = require("../../db")
const commentQueries = require("../queries/comments.queries")

let controllers = {}

controllers.getCommentsByPostId = async (req, res) => {
    try {
        const id = req.params.id
        let comments = await pool.query(commentQueries.getCommentsByPostId, [id])
        res.send(comments.rows)
    } catch (error) {
        res.send(error.message)
    }
}

controllers.deleteComment = async (req, res) => {
    try {
        const id = req.params.id
        await pool.query(commentQueries.deleteComment, [id])
        res.send("Comment successfully deleted")
    } catch (error) {
        res.send(error.message)
    }
}

controllers.createComment = async (req, res) => {
    try {
        const {content, post_id, user_id} = req.body
        await pool.query(commentQueries.createComment, [content, post_id, user_id])
        res.send("Comment successfully created")
    } catch (error) {
        res.send(error.message)
    }
}

module.exports = controllers