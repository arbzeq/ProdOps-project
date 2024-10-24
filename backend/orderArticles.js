import { eventHandler } from "./EventHandler.js";

export async function orderArticles(pool, req, res, getRequestBody){
  //console.log("At orderArticles");
  const body = await getRequestBody(req);
  const query = `
                UPDATE articles
                  SET article_count = CASE
                    WHEN article_name = 'ARTICLE_A' THEN article_count + $1
                    WHEN article_name = 'ARTICLE_B' THEN article_count + $2
                  END
                RETURNING *;
                `;
   
  let databaseResponse = await pool.query(query, Object.values(body));
  databaseResponse = databaseResponse.rows;
  
  if(databaseResponse.length > 0){
    res.writeHead(201,  { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Articles added succesfully.' }));
  }

  // After succesfully ordering articles, check if there are 3 of type Article_A and 2 of type Article_B.
  // If there are, emit an event to transport the articles.
  eventHandler.emit("orderedArticles", pool);
  

}