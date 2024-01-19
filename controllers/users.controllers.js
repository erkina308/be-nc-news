const { selectUsers } = require("../models/users.models");

exports.getUsers = (req, res, next) => {
  selectUsers()
    .then((response) => {
      res.status(200).send({ users: response });
    })
    .catch((err) => {
      next(err);
    });
};
