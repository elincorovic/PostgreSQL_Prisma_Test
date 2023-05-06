let queries = {}

queries.getUsers = "SELECT * FROM users"

queries.getUserById = "SELECT * FROM users WHERE id=$1"

queries.createUser = "INSERT INTO users (username, password, email, bio) VALUES ($1, $2, $3, $4)"

queries.checkUsernameExists = "SELECT * FROM users WHERE username=$1"

queries.checkEmailExists = "SELECT * FROM users WHERE email=$1"

queries.deleteUser = "DELETE FROM users WHERE id=$1"

queries.follow = "INSERT INTO follow (user_id, follower_id) VALUES ($1, $2)"

queries.unfollow = "DELETE FROM follow WHERE user_id=$1 AND follower_id=$2"

queries.getPostsByUserId = "SELECT * FROM posts WHERE user_id=$1"

module.exports = queries