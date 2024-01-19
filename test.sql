\c nc_news_test

--SELECT comments.article_id, comments.comment_id, comments.author, --comments.votes, comments.created_at, comments.body FROM comments AS comments
--JOIN articles AS articles 
--ON comments.article_id = articles.article_id AND articles.article_id = 
--ORDER BY comments.created_at DESC
  
SELECT articles.article_id, articles.title, COUNT(comments.comment_id) AS comment_count FROM articles AS articles
LEFT JOIN comments AS comments
ON articles.article_id = comments.article_id
WHERE articles.article_id = 1
GROUP BY articles.article_id

  
  