const prisma = require("../../db");

let controllers = {};

controllers.getUsers = async (req, res) => {
    try {
        let users = await prisma.user.findMany();
        res.send(users);
    } catch (error) {
        res.send(err.message);
    }
};

controllers.getUserById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        let user = await prisma.user.findUnique({
            where: {
                id: id
            },
            include: {
                _count: true
            }
        });
        if (user) {
            res.send(user);
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
        let checkUsername = await prisma.user.findUnique({
            where: {
                username: username
            }
        });
        let checkEmail = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (checkUsername) {
            res.send("Username is already taken");
        } else if (checkEmail) {
            res.send("Email is already taken");
        } else {
            let user = await prisma.user.create({
                data: {
                    username: username,
                    password: password,
                    email: email,
                    bio: bio
                }
            });
            res.send("User: " + user.username + " successfully created");
        }
    } catch (error) {
        res.send(error.message);
    }
};

controllers.deleteUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        let checkUser = await prisma.user.findUnique({
            where: {
                id: id
            }
        })
        if (!checkUser) {
            res.send("No user with this id")
        } else {
            let deletedUser = await prisma.user.delete({
                where: {
                    id: id
                }
            })
            res.send("User: " + deletedUser.username + " successfully deleted")
        }
    } catch (error) {
        res.send(error.message)
    }
}

controllers.follow = async (req, res) => {
    try {
        const followedId = parseInt(req.body.followed_id)
        const followerId = parseInt(req.body.follower_id)
        let checkFollow = await prisma.follow.findFirst({
            where: {
                followed_id: followedId,
                follower_id: followerId
            }
        })
        if (checkFollow) {
            res.send("Already follwing")
        } else {
            let result = await prisma.follow.create({
                data: {
                    followed_id: followedId,
                    follower_id: followerId
                }
            })
            res.send("Now following " + result.followed_id)
        }
    } catch (error) {
        res.send(error.message)
    }
}

controllers.unfollow = async (req, res) => {
    try {
        const followedId = parseInt(req.body.followed_id)
        const followerId = parseInt(req.body.follower_id)
        let result = await prisma.follow.deleteMany({
            where: {
                followed_id: followedId,
                follower_id: followerId
            }
        })
        if (result.count) {
            res.send("Unfollowed")
        } else {
            res.send("Already unfollowed")
        }
    } catch (error) {
        res.send(error.message)
    }
}

controllers.getPostsByUserId = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        let posts = await prisma.post.findMany({
            where: {
                user_id: id
            }
        })
        res.send(posts)
    } catch (error) {
        res.send(error.message)
    }
}

module.exports = controllers;
