DROP TABLE IF EXISTS articles;

CREATE TABLE articles (
	id SERIAL PRIMARY KEY,
	article_name VARCHAR(10),
	article_count INTEGER
);

INSERT INTO articles (article_name, article_count)
values 
	('ARTICLE_A', 0), 
	('ARTICLE_B', 0);

UPDATE articles
    SET article_count = CASE
      WHEN article_name = 'ARTICLE_A' THEN article_count + $1
      WHEN article_name = 'ARTICLE_B' THEN article_count + $2
    END
RETURNING *;

select * from articles;