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
      .then((result) => {
        expect(result.body.endpoints).toEqual(endpoints);
      });
  });
});

describe("/api/articles/:article_id", () => {
  test("GET: 200 responds with an object containing properties of author, title, article_id, body, topic, created_at, votes, article_img_url", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        expect(body[0].article_id).toBe(1)
        expect(body[0].title).toBe('Living in the shadow of a great man')
        expect(body[0].topic).toBe('mitch')
        expect(body[0].author).toBe('butter_bridge')
        expect(body[0].body).toBe('I find this existence challenging')
        expect(body[0].created_at).toBe('2020-07-09T20:11:00.000Z')
        expect(body[0].votes).toBe(100)
      });
  });
  test("GET: 404 sends an appropriate error status alongside an error message when given a valid but non-existent id", () => {
    return request(app)
      .get("/api/articles/100")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article does not exist");
      });
  });
  test("GET: 400 sends an appropriate error status alongside an error message when given an invalid id", () => {
    return request(app)
      .get("/api/articles/invalid-id")
      .expect(400)
      .then(({body}) => {
        expect(body.msg).toBe("Bad request")
      })
  });
});
