const { checkTopicExists } = require("../check-topic-exists");
const {
  selectArticleById,
  selectCommentByArticleId,
  insertCommentByArticleId,
  updateArticleById,
  selectUser,
  selectCommentById,
  removeCommentById,
  selectArticles,
} = require("../models/articles.models");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article: article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const select1 = selectArticleById(article_id);
  const select2 = selectCommentByArticleId(article_id);
  const promises = [select1, select2];
  Promise.all(promises)
    .then((comment) => {
      const commentToSend = comment[1];
      res.status(200).send({ comment: commentToSend });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postCommentByArticleId = (req, res, next) => {
  const newComment = req.body;
  const username = newComment.username;
  const body = newComment.body;
  const { article_id } = req.params;
  if (!body) {
    res.status(400).send({ msg: "Bad request" });
  }
  const select1 = selectArticleById(article_id);
  const select2 = selectCommentByArticleId(article_id);
  const insert = insertCommentByArticleId(article_id, newComment);
  const findUser = selectUser(username);
  const promises = [select1, select2, insert, findUser];
  Promise.all(promises)
    .then((comment) => {
      const commentToSend = comment[2];
      res.status(201).send({ comment: commentToSend });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticleById = (req, res, next) => {
  const { inc_votes } = req.body;
  const numToIncreaseBy = inc_votes;
  const { article_id } = req.params;

  const select = selectArticleById(article_id);
  const update = updateArticleById(article_id, numToIncreaseBy);
  const promises = [select, update];
  Promise.all(promises)
    .then((article) => {
      if (inc_votes !== null) {
        const articleToUpdate = article[1];
        res.status(200).send(articleToUpdate);
      } else {
        console.log(article[0], "<--- article within controller");
        res.status(200).send(article[0]);
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteCommentByCommentId = (req, res, next) => {
  const { comment_id } = req.params;

  const select = selectCommentById(comment_id);
  const remove = removeCommentById(comment_id);
  const promises = [select, remove];
  Promise.all(promises)
    .then((response) => {
      const toDelete = response[1];
      res.status(204).send(toDelete);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticles = (req, res, next) => {
  const { topic } = req.query;
  const select = selectArticles(topic);

  const promises = [select];
  if (topic) {
    const checkExists = checkTopicExists(topic);
    promises.push(checkExists);
  }

  Promise.all(promises)
    .then((article) => {
      const toSend = article[0];
      res.status(200).send({ articles: toSend });
    })
    .catch((err) => {
      next(err);
    });
};
