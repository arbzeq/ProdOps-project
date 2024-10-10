export async function userExists(username: string, password: string) {
  const response = await fetch('http://localhost:5000/api/exists',
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    }
  );
  
  
  return response;
}

export async function createUser(username: string, password: string) {
  const response = await fetch('http://localhost:5000/api/register',
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    }
  );
  return response;
  
} 