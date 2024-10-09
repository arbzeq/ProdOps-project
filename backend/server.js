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

const requestListener = async (req, res) => {
    // Set CORS headers for all responses
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Allow your frontend origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allow methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow headers

    if (req.method === 'OPTIONS') {
        // Handle preflight requests.
        res.writeHead(204); // No content
        return res.end();
    }

    if (req.method === 'GET' && req.url === '/api/register') {
        try {
            const result = await pool.query('SELECT * FROM users');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result.rows));
        } catch (error) {
            console.error(error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Server Error' }));
        }
    } else if (req.method === 'POST' && req.url === '/api/register') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString(); // Convert Buffer to string
        });

        req.on('end', async () => {
            const { username, password } = JSON.parse(body); // Parse the JSON body

            try {
                const result = await pool.query(
                    'INSERT INTO users (username, password) VALUES ($1, $2)',
                    [username, password]
                );
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result.rows[0]));
            } catch (error) {
                console.error(error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Server Error' }));
            }
        });
    } else if (req.method == "POST" && req.url == "/api/exists") {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString(); // Convert Buffer to string
        });

        req.on('end', async () => {
            const { username, password } = JSON.parse(body); // Parse the JSON body

            try {
                const query = `SELECT EXISTS( 
                    SELECT 1 
                    FROM users 
                    WHERE username = $1
                    AND password = $2
                    );
                `;
                const result = await pool.query(query, [username, password]);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result));
            } catch (error) {
                console.error(error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Server Error' }));
            }
        });
        
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
};

const server = http.createServer(requestListener);

server.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
