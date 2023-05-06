let queries = {}

queries.getCommentsByPostId = "SELECT * FROM comments WHERE post_id=$1"

queries.deleteComment = "DELETE FROM comments WHERE id=$1"

queries.createComment = "INSERT INTO comments (content, post_id, user_id) VALUES ($1, $2, $3)"

module.exports = queries