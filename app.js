const express = require("express");
const app = express();

const { getTopics } = require("./controllers/topics.controllers");
const { getAllEndpoints } = require("./controllers/endpoints.controllers");
const {
  getArticleById,
  getCommentByArticleId,
} = require("./controllers/articles.controllers");

app.get("/api/topics", getTopics);

app.get("/api", getAllEndpoints);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getCommentByArticleId);

//error handling

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad request" });
  } else {
    res.status(404).send(err);
  }
});

module.exports = app;
