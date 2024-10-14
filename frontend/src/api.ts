export async function userAPI(endpoint: string, username: string, password: string) {
  
  const response = await fetch(`http://localhost:5000/api/${endpoint}`,
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    }
  );
  
  const responseMessage = (await response.json()).message;
  
  if(!response.ok){
    throw new Error(responseMessage);
  }

  return responseMessage;
};

export async function orderArticles(articleA: string, articleB: string) {
  const response = await fetch('http://localhost:5000/api/register',
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ articleA, articleB })
    }
  );
  return response;
}