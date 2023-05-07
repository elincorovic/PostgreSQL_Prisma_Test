const express = require("express");
const userRoutes = require("./src/routes/users.routes");
const postRoutes = require("./src/routes/posts.routes");
const commentRoutes = require("./src/routes/comments.routes")

const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(3000, () => {
    console.log("app listening on port 3000, http://localhost:3000");
});
