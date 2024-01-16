const express = require("express");
const app = express();

const { getTopics } = require("./controllers/topics.controllers");

const { getAllEndpoints } = require("./controllers/endpoints.controllers");

app.get("/api/topics", getTopics);

app.get("/api", getAllEndpoints);

module.exports = app;
