const pool = require("../../db");
const postQueries = require("../queries/posts.queries");

let controllers = {};

controllers.getPostById = async (req, res) => {
    try {
        const id = req.params.id;
        let post = await pool.query(postQueries.getPostById, [id]);
        if (post.rows.length > 0) {
            res.send(post.rows);
        } else {
            res.send("No posts with this id");
        }
    } catch (error) {
        res.send(error.message);
    }
};

controllers.createPost = async (req, res) => {
    try {
        const { img_path, caption, user_id } = req.body;
        await pool.query(postQueries.createPost, [img_path, caption, user_id]);
        res.send("Post successfully created");
    } catch (error) {
        res.send(error.message);
    }
};

controllers.deletePost = async (req, res) => {
    try {
        const id = req.params.id;
        let result = await pool.query(postQueries.deletePost, [id]);
        res.send("Post successfully deleted");
    } catch (error) {
        res.send(err.message);
    }
};

controllers.getLikesByPostId = async (req, res) => {
    try {
        const id = req.params.id;
        let likes = await pool.query(postQueries.getLikesByPostId, [id]);
        res.send(likes.rows);
    } catch (error) {
        res.send(err.message);
    }
};

controllers.likePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.body.user_id;
        let like = await pool.query(postQueries.likePost, [userId, postId]);
        if (like.rowCount) {
            res.send("Liked post with id" + postId);
        } else {
            res.send("No post with this id");
        }
    } catch (error) {
        res.send(error.message);
    }
};

module.exports = controllers;
