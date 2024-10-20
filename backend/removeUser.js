export async function removeUser (pool, req, res, getRequestBody) {
  
  const username = await getRequestBody(req);
  const query = `DELETE FROM users WHERE username = $1 RETURNING *`;
  let databaseResponse = await pool.query(query, [username]);
  
  if (databaseResponse.rowCount > 0) {
    res.writeHead(200,  { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User removed succesfully.' }));
  } else {
    res.writeHead(404,  { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `User doesn't exists.` }));
  }
}