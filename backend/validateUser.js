const dbQuery_validateUser = async (pool, username) => {
  /*
  This function will return the user if it exists.
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
  */

  const query = `SELECT * FROM USERS WHERE username = $1`;
  let result = await pool.query(query, [username]);
  return result.rows;
}

export async function validateUser(pool, req, res, getRequestBody){

  const reqBody = await getRequestBody(req);
  console.log(reqBody);
  

  const databaseResponse = await dbQuery_validateUser(pool, reqBody.username);
  console.log("Coming here?");
  console.log(databaseResponse);
  console.log(databaseResponse.length);
   
  if(databaseResponse.length == 0){
    res.writeHead(404,  { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User not found.' }));
    return;
  }
  
  const user = databaseResponse[0];
  console.log("Coming here 2?");
  console.log(user);
  
  if (user.password != reqBody.password) {
      res.writeHead(401,  { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Incorrect password.' }));
      return;
  }

  res.writeHead(200,  { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(user));  
}

