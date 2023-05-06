const pool = require("../../db");
const likesQueries = require("../queries/likes.queries");

let controllers = {};

controllers.deleteLike = async (req, res) => {
    try {
        const id = req.params.id;
        let like = await pool.query(likesQueries.deleteLike, [id]);
        if (like.rowCount) {
            res.send("Like successfully deleted")
        } else {
            res.send("No like with this id")
        }
    } catch (error) {
        res.send(error.message)
    }
};

module.exports = controllers