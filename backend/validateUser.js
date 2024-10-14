const dbQuery_validateUser = async (pool, username, password) => {
  /*
  This function will return the HTTP response based on 
  whether a user exists, wrong password or everything is correct.
  */
  const query = `
    WITH validate_user AS (
      SELECT
        username,
        CASE
          WHEN password = $2 THEN 'VALID_AUTHENTICATION'
          ELSE 'INCORRECT_PASSWORD'
        END AS password_status
      FROM USERS
      WHERE username = $1
    )
    SELECT 
      CASE 
        WHEN (SELECT COUNT(*) FROM validate_user) = 0 THEN 'USER_NOT_FOUND'
        ELSE (SELECT password_status FROM validate_user)
      END AS "result";
  `;
  let result = await pool.query(query, [username, password]);
  return result.rows[0].result;
}

export async function validateUser(pool, req, res, getRequestBody){

  
  const body = await getRequestBody(req);
  const { username, password } = JSON.parse(body);
  const databaseResponse = await dbQuery_validateUser(pool, username, password);
  console.log("Coming here?");
  console.log(databaseResponse);
  switch (databaseResponse) {
    case 'USER_NOT_FOUND':
      res.writeHead(404,  { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found.' }));
      break;
    case 'INCORRECT_PASSWORD':
      res.writeHead(401,  { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Incorrect password.' }));
      break;
    case 'VALID_AUTHENTICATION':
      res.writeHead(200,  { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Logged in succesfully.' }));
      break;  
  }
}

