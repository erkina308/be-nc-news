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
        body.forEach((article) => {
          expect(article.article_id).toBe(1);
          expect(article.title).toBe("Living in the shadow of a great man");
          expect(article.topic).toBe("mitch");
          expect(article.author).toBe("butter_bridge");
          expect(article.body).toBe("I find this existence challenging");
          expect(article.created_at).toBe("2020-07-09T20:11:00.000Z");
          expect(article.votes).toBe(100);
        });
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
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});

describe("/api/articles/:article_id/comments", () => {
  test("GET: 200 responds with an array of comments for the given article id", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comment.length).toBe(11);
        body.comment.forEach((comment) => {
          expect(typeof comment.body).toBe("string");
          expect(typeof comment.votes).toBe("number");
          expect(typeof comment.author).toBe("string");
          expect(typeof comment.article_id).toBe("number");
          expect(typeof comment.created_at).toBe("string");
        });
      });
  });
  test("GET: 404 sends an appropriate error status alongside an error message when given a valid but non-existent id", () => {
    return request(app)
      .get("/api/articles/1000/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article does not exist");
      });
  });
  test("GET: 400 sends an appropriate error status alongside an error message when given an invalid id", () => {
    return request(app)
      .get("/api/articles/invalid-id/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
//   test("GET: 200 responds with an empty array for an article id that exists but has no comments", () => {
//     return request(app)
//       .get("/api/articles/7/comments")
//       .expect(200)
//       .then(({ body }) => {
//         console.log(body, "<--- body in test");
//         expect(body.comment).toEqual([]);
//       });
//   });
});

describe("/api/articles/:article_id/comments", () => {
  test("POST: 201 responds with the new posted comment", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        author: "butter_bridge",
        body: "What is this article about?",
      })
      .expect(201)
      .then(({ body }) => {
        const created_at = body.comment[0].created_at;
        expect(body.comment[0]).toMatchObject({
          comment_id: 19,
          body: "What is this article about?",
          article_id: 1,
          author: "butter_bridge",
          votes: 0,
          created_at: created_at,
        });
      });
  });
  test("POST: 404 sends an appropriate error status alongside an error message when given a valid but non-existent id", () => {
    return request(app)
      .post("/api/articles/1000/comments")
      .send({
        author: "butter_bridge",
        body: "What is this article about?",
      })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article does not exist");
      });
  });
  test("POST: 400 sends an appropriate error status alongside an error message when given an invalid id", () => {
    return request(app)
      .post("/api/articles/invalid-id/comments")
      .send({
        author: "butter_bridge",
        body: "What is this article about?",
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("POST: 400 sends an appropriate error status alongside an error message when given an invalid id", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        author: "butter_bridge",
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});
