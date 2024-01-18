const db = require("../db/connection");

exports.selectArticleById = (id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1;", [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ msg: "Article does not exist" });
      }
      return rows;
    });
};

exports.selectCommentByArticleId = (article_id) => {
  let queryStr = `
  SELECT comments.article_id, comments.comment_id, comments.author, comments.votes, comments.created_at, comments.body FROM comments AS comments
  JOIN articles AS articles 
  ON comments.article_id = articles.article_id AND articles.article_id = $1
  ORDER BY comments.created_at DESC;`;

  return db.query(queryStr, [article_id]).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ msg: "Article does not exist" });
    }
    return rows;
  });
};

exports.insertCommentByArticleId = (article_id, comment) => {
  let queryStr = `INSERT INTO comments`;

  if (article_id) {
    return db
      .query("SELECT * FROM articles WHERE article_id = $1;", [article_id])
      .then(({ rows }) => {
        if (rows.length === 0) {
          return Promise.reject({ msg: "Article does not exist" });
        }

        queryStr += `
        (article_id, author, body)
        VALUES
        ($1, $2, $3)
        RETURNING *;
        `;
        return db
          .query(queryStr, [article_id, comment.author, comment.body])
          .then(({ rows }) => {
            return rows;
          });
      });
  }
};
