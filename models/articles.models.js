const db = require("../db/connection");

exports.selectArticleById = (id) => {
  let queryStr = `
  SELECT articles.*, COUNT(comments.comment_id) AS comment_count FROM articles AS articles
  LEFT JOIN comments AS comments
  ON articles.article_id = comments.article_id 
  WHERE articles.article_id = $1
  GROUP BY articles.article_id;`;

  return db.query(queryStr, [id]).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ msg: "Article does not exist" });
    }
    return rows[0];
  });
};

exports.selectCommentById = (id) => {
  return db
    .query(`SELECT * FROM comments WHERE comment_id = $1`, [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ msg: "Comment does not exist" });
      }
      return rows;
    });
};

exports.selectUser = (user) => {
  return db
    .query(`SELECT username FROM users WHERE username = $1;`, [user])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ msg: "User does not exist" });
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
    return rows;
  });
};

exports.insertCommentByArticleId = (article_id, comment) => {
  let queryStr = `
  INSERT INTO comments
  (article_id, author, body)
  VALUES
  ($1, $2, $3)
  RETURNING *;`;

  return db
    .query(queryStr, [article_id, comment.username, comment.body])
    .then(({ rows }) => {
      return rows;
    });
};

exports.updateArticleById = (article_id, numToIncreaseBy) => {
  let queryStr = `
  UPDATE articles SET votes = votes + $1
  WHERE article_id = $2
  RETURNING *;
  `;
  return db.query(queryStr, [numToIncreaseBy, article_id]).then(({ rows }) => {
    return rows;
  });
};

exports.removeCommentById = (comment_id) => {
  let queryStr = `
DELETE FROM comments
WHERE comment_id = $1
RETURNING *;
`;
  return db.query(queryStr, [comment_id]).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ msg: "Comment does not exist" });
    }
    return rows;
  });
};

exports.selectArticles = (topic) => {
  let queryStr = `SELECT * FROM articles`;

  const query = [];

  if (topic) {
    queryStr += ` WHERE topic = $1;`;
    query.push(topic);
  }
  return db.query(queryStr, query).then(({ rows }) => {
    return rows;
  });
};
