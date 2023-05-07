const prisma = require("../../db");

let controllers = {};

controllers.getPostById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        let post = await prisma.post.findUnique({
            where: {
                id: id
            }
        });
        if (post) {
            res.send(post);
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
        await prisma.post.create({
            data: {
                img_path: img_path,
                caption: caption,
                user_id: user_id
            }
        });
        res.send("Post successfully created");
    } catch (error) {
        res.send(error.message);
    }
};

controllers.deletePost = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        let result = await prisma.post.delete({
            where: {
                id: id
            }
        });
        console.log(result)
        if (result) {
            res.send("Post successfully deleted");
        } else {
            res.send("No post with this id")
        }
    } catch (error) {
        res.send(error.message);
    }
};

controllers.getLikesByPostId = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        let likes = await prisma.like.findMany({
            where: {
                post_id: id
            }
        });
        res.send(likes);
    } catch (error) {
        res.send(error.message);
    }
};

controllers.likePost = async (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        const userId = parseInt(req.body.user_id);
        let checkLike = await prisma.like.findFirst({
            where: {
                post_id: postId,
                user_id: userId
            }
        })
        if (checkLike) {
            res.send("Already liked this post")
        } else {
            let like = await prisma.like.create({
                data: {
                    post_id: postId,
                    user_id: userId
                }
            });
            if (like) {
                res.send("Liked post with id" + postId);
            } else {
                res.send("No post or user with this id");
            }
        }
    } catch (error) {
        res.send(error.message);
    }
};

controllers.unlikePost = async (req, res) => {
    try {
        const id = req.body.like_id;
        let like = await prisma.like.delete({
            where: {
                id: id
            }
        });
        if (like) {
            res.send("Like successfully deleted")
        } else {
            res.send("No like with this id")
        }
    } catch (error) {
        res.send(error.message)
    }
};

module.exports = controllers;
