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
  SELECT * FROM comments 
  WHERE article_id = $1
  ORDER BY created_at DESC
  ;
  `;

  return db.query(queryStr, [article_id]).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ msg: "Article does not exist" });
    }
    return rows;
  });
};
