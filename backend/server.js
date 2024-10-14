/* The error codes are as follows:
200 OK: User exists, password correct.
201 Created: User created.
204 No content: -.
401 Unauthorized: User exists but incorrect password.
404 Not found: User does not exist.
409 Conflict: User already exists.
*/

import { createUser } from './createUser.js'; 
import { validateUser } from './validateUser.js'; 
import http from 'http';
import pg from 'pg';

// PostgreSQL connection setup
const pool = new pg.Pool({
  user: 'postgres', // replace with your PostgreSQL username
  host: 'localhost',
  database: 'prodops', // replace with your database name
  password: 'p', // replace with your PostgreSQL password
  port: 5432
});



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
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'An internal server error occurred.' }));
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
  
  if (req.method === 'POST' && req.url === '/api/register') {
    await createUser(pool, req, res, getRequestBody);
    
  // This is the API request to validate the login. 
  } else if (req.method == "POST" && req.url == "/api/validateUser") {
    
    await validateUser(pool, req, res, getRequestBody);
  }
};

const server = http.createServer(requestListenerWithErrorHandling(requestListener));

server.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
