const pool = require("../../db");
const userQueries = require("../queries/users.queries");

let controllers = {};

controllers.getUsers = async (req, res) => {
    try {
        let users = await pool.query(userQueries.getUsers);
        res.send(users.rows);
    } catch (error) {
        res.send(err.message);
    }
};

controllers.getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        let user = await pool.query(userQueries.getUserById, [id]);
        if (user.rows.length) {
            res.send(user.rows);
        } else {
            res.send("No user with this id");
        }
    } catch (error) {
        res.send(error.message);
    }
};

controllers.createUser = async (req, res) => {
    try {
        const { username, password, email, bio } = req.body;
        let checkUsername = await pool.query(userQueries.checkUsernameExists, [
            username,
        ]);
        let checkEmail = await pool.query(userQueries.checkEmailExists, [
            email,
        ]);
        if (checkUsername.rowCount) {
            res.send("Username is already taken");
        } else if (checkEmail.rowCount) {
            res.send("Email is already taken");
        } else {
            let user = await pool.query(userQueries.createUser, [
                username,
                password,
                email,
                bio,
            ]);
            res.send("User successfully created");
        }
    } catch (error) {
        res.send(error.message);
    }
};

controllers.deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        let checkUser = await pool.query(userQueries.getUserById, [id])
        if (!checkUser.rowCount) {
            res.send("No user with this id")
        } else {
            let deletedUser = await pool.query(userQueries.deleteUser, [id])
            res.send("User successfully deleted")
        }
    } catch (error) {
        res.send(error.message)
    }
}

controllers.follow = async (req, res) => {
    try {
        const userId = parseInt(req.body.user_id)
        const followerId = parseInt(req.body.follower_id)
        let result = await pool.query(userQueries.follow, [userId, followerId])
        res.send("Now following " + userId)
    } catch (error) {
        res.send(error.message)
    }
}

controllers.unfollow = async (req, res) => {
    try {
        const userId = parseInt(req.body.user_id)
        const followerId = parseInt(req.body.follower_id)
        let result = await pool.query(userQueries.unfollow, [userId, followerId])
        res.send("Unfollowed " + userId)
    } catch (error) {
        res.send(error.message)
    }
}

controllers.getPostsByUserId = async (req, res) => {
    try {
        const id = req.params.id
        let posts = await pool.query(userQueries.getPostsByUserId, [id])
        res.send(posts.rows)
    } catch (error) {
        res.send(error.message)
    }
}

module.exports = controllers;
