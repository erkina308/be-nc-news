const fs = require("fs/promises");

exports.selectAllEndpoints = () => {
  return fs.readFile("../endpoints.json", "utf8");
};
