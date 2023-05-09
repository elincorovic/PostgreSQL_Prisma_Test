let prisma = require("../../db")

let controllers = {}

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

module.exports = controllers