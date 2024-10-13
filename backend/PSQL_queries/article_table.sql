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

update articles
set article_count = 2
where article_name = 'ARTICLE_A';

select * from articles;