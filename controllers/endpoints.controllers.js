const { selectAllEndpoints } = require("../models/endpoints.models");

exports.getAllEndpoints = (req, res, next) => {
  selectAllEndpoints()
    .then((fileContents) => {
      res.send(fileContents);
    })
    .catch((err) => {
      next(err);
    });
};
