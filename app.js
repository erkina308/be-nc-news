const express = require("express");
const app = express();

const { getTopics } = require("./controllers/topics.controllers");
const { getAllEndpoints } = require("./controllers/endpoints.controllers");
const {
  getArticleById,
  getCommentByArticleId,
  postCommentByArticleId,
} = require("./controllers/articles.controllers");

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api", getAllEndpoints);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getCommentByArticleId);

app.post("/api/articles/:article_id/comments", postCommentByArticleId);

//error handling

app.use((err, req, res, next) => {
  if (err.code === "22P02" || err.code === "23502") {
    res.status(400).send({ msg: "Bad request" });
  } else {
    res.status(404).send(err);
  }
});

module.exports = app;
