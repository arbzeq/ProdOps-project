const API_URL = 'http://localhost:5000/api/users';



export async function userExists(username: string, password: string) {
  const response = await fetch('http://localhost:5000/api/exists',
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password})
    }
  );

  if(!response.ok) {
    throw new Error("Failed to check whether user exists.");
  }
  return await response.json();
} 

export async function createUser(username: string, password: string) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username, password})
  });

  if(!response.ok) {
    throw new Error("Failed to fetch users.");
  }
  return await response.json();
} 