const dbQuery_doesUserExist = async (pool, username) => {
  /* This function will return whether a user exists or not. */
  const query = `
    SELECT
        CASE
          WHEN EXISTS(SELECT 1 FROM USERS WHERE username = $1)
          THEN 'USER_EXISTS'
          ELSE 'USER_DOES_NOT_EXIST'
        END AS user_status;
  `;
  let result = await pool.query(query, [username]);
  return result.rows[0].user_status;
}


export async function removeUser (pool, req, res, getRequestBody) {
  
  const body = await getRequestBody(req);
  
  let databaseResponse = await dbQuery_doesUserExist(pool, body.username);
  
  const query = `DELETE FROM users WHERE username = $1 RETURNING *`;
  let result = await pool.query(query, [username]);
  return result.rows[0].user_status;

  // Create the user if the user does not exist.
  if (databaseResponse == 'USER_DOES_NOT_EXIST') {
    const result = await pool.query(
      'INSERT INTO users (username, password, isAdmin) VALUES ($1, $2, $3)',
      Object.values(body)
    );

    res.writeHead(409,  { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `User doesn't exists.` }));
    
    
    
  // Throw a 409 conflict response if a user exists
  } else { 
    res.writeHead(201,  { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User removed succesfully.' }));
  }

}