const db = require("../db/connection");

exports.selectTopics = () => {
  return db.query("SELECT * FROM topics;").then(({rows}) => {
    console.log(rows, "<-- response in models");
    return rows
  });
};
