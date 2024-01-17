const { response } = require("../app");
const {
  selectArticleById,
  selectCommentByArticleId,
} = require("../models/articles.models");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  selectCommentByArticleId(article_id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      next(err);
    });
};
