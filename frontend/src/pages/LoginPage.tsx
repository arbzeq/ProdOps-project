import { ReactNode, useRef } from "react";
import { useAuth } from "../contexts";
import { userExists } from "../api.ts";

export function LoginPage(): ReactNode {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const context = useAuth();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    //Look whether the user exists in database.
    if(usernameRef.current && passwordRef.current){
      try {
        let userExistsVariable = await userExists(usernameRef.current.value, passwordRef.current.value);
        console.log(userExistsVariable);
      } catch(error){
        console.error("Something went wrong!");
      }
    }
  }

  return (
    <div>
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="loginUsername">Username</label>
          <input type="text" ref={usernameRef} />
        </div>

        <div>
          <label htmlFor="loginPassword">Password</label>
          <input type="password" ref={passwordRef} />
        </div>

        <button type="submit">Login</button>
      </form>

    </div>

  );
}