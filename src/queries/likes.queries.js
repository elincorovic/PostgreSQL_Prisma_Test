let queries = {}

queries.deleteLike = "DELETE FROM likes WHERE id=$1"

module.exports = queries