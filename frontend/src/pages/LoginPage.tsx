import { ReactNode, useState } from "react";
import { useAuth } from "../contexts";

export function LoginPage(): ReactNode {
  const [loginUsername, setLoginUsername] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");

  const context = useAuth();
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    //Look whether the user exists in database.

    let userInDatabase = false;
    context.login();
  }

  return (
    <div>
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="loginUsername">Username</label>
          <input type="text" onChange={(e) => setLoginUsername(e.target.value)} />
        </div>

        <div>
          <label htmlFor="loginPassword">Password</label>
          <input type="password" onChange={(e) => setLoginPassword(e.target.value)} />
        </div>

        <button type="submit">Login</button>
      </form>

    </div>

  );
}