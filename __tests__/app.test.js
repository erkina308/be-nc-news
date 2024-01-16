const app = require("../app.js");
const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index.js");
const endpoints = require("../endpoints.json");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("/api/topics", () => {
  test("GET: 200 Sends an array of topic objects with the properties of slug and description", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(3);
        body.forEach((item) => {
          expect(typeof item.slug).toBe("string");
          expect(typeof item.description).toBe("string");
        });
      });
  });
});

describe("/api", () => {
  test("GET: 200 responds with an object describing all available endpoints on API", () => {
    return request(app)
      .get("/api")
      .then(() => {
        expect(endpoints).toEqual(endpoints);
      });
  });
});
