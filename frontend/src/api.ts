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
  if (!response.ok) {
    throw new Error("Failed to check whether user exists.");
  }
  return response.json();
}

export async function createUser(username: string, password: string) {
  const userExistsResponse = await userExists(username, password);
  if(!userExistsResponse.exists){
    const response = await fetch('http://localhost:5000/api/register',
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      }
    );
    if (!response.ok) {
      throw new Error("API: Something went wrong when creating user.");
    }
    return response.json();
  }
} 