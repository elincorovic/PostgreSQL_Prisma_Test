let queries = {}

queries.getPostById = "SELECT posts.*, COUNT(likes.id) AS likes_count FROM posts LEFT JOIN likes ON posts.id = likes.post_id WHERE posts.id=$1 GROUP BY posts.id"

queries.createPost = "INSERT INTO posts (img_path, caption, user_id) VALUES ($1, $2, $3)"

queries.deletePost = "DELETE FROM posts WHERE id=$1"

queries.getLikesByPostId = "SELECT * FROM likes WHERE post_id=$1"

queries.likePost = "INSERT INTO likes (user_id, post_id) VALUES ($1, $2)"

module.exports = queries