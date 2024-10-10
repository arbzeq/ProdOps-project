/* The error codes are as follows:
200 OK: User exists, password correct.
201 Created: User created.
204 No content: -.
401 Unauthorized: User exists but incorrect password.
404 Not found: User does not exist.
409 Conflict: User already exists.
*/

const http = require('http');
const { Pool } = require('pg');

// PostgreSQL connection setup
const pool = new Pool({
  user: 'postgres', // replace with your PostgreSQL username
  host: 'localhost',
  database: 'prodops', // replace with your database name
  password: 'p', // replace with your PostgreSQL password
  port: 5432
});

const databaseCall = async (username, password) => {
  /*
  This function will return the HTTP response based on 
  whether a user exists, wrong password or everything is correct.
  */
  try {

    const query = `
      WITH validate_user AS (
        SELECT
          username,
          CASE
            WHEN password = $2 THEN 200
            ELSE 401
          END AS password_status
        FROM USERS
        WHERE username = $1
      )
      SELECT 
        CASE 
          WHEN (SELECT COUNT(*) FROM validate_user) = 0 THEN 404
          ELSE (SELECT password_status FROM validate_user)
        END AS "result";
    `;
    let result = await pool.query(query, [username, password]);
    result = result.rows[0].result;
    
    return result;
  } catch {
    throw new Error('Database error');
  }
}

const getRequestBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString(); // Convert Buffer to string
    });

    req.on('end', () => {
      resolve(body);
    })

    req.on('error', (error) => {
      reject(error);
    })
  });
};


const requestListenerWithErrorHandling = (callbackFn) => {
  return async (req, res) => {
    try{
      await callbackFn(req, res);
    } catch(error) {
      console.log(error);
      res.writeHead(500);
      res.end();
    }
  };
}


const requestListener = async (req, res) => {
  
  
  // Set CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Allow your frontend origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allow methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow headers

  if (req.method === 'OPTIONS') {
    // Handle preflight requests.
    res.writeHead(204);
    return res.end();
  }
  console.log(req.url);
  if (req.method === 'GET' && req.url === '/api/register') {
    const result = await pool.query('SELECT * FROM users');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result.rows));

  } else if (req.method === 'POST' && req.url === '/api/register') {
    const body = await getRequestBody(req);
    const { username, password } = JSON.parse(body);
    let databaseResponse = await databaseCall(username, password);
    if (databaseResponse == 404) { //if a user does not exist
      const result = await pool.query(
        'INSERT INTO users (username, password) VALUES ($1, $2)',
        [username, password]
      );
      res.writeHead(201);
    } else {
      res.writeHead(409);
    }
    
  // This is the API request to validate the login. 
  } else if (req.method == "POST" && req.url == "/api/exists") {
    const body = await getRequestBody(req);
    const { username, password } = JSON.parse(body);
    const databaseResponse = await databaseCall(username, password);
    res.writeHead(databaseResponse);
  }
  
  res.end();
  
};

const server = http.createServer(requestListenerWithErrorHandling(requestListener));

server.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
