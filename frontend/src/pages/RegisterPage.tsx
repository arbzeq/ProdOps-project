import { ReactNode, useRef } from "react";
import { useAuth } from "../contexts";
import { userExists } from "../api.ts";

export function RegisterPage(): ReactNode {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const context = useAuth();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    if(usernameRef.current && passwordRef.current){
      try {
        let userExistsVariable = await userExists(usernameRef.current.value, passwordRef.current.value);
        console.log(userExistsVariable);
      } catch(error){
        console.error("Something went wrong!");
      }
      
    }
    
    context.login();
  }

  return (
    <div>
      <h1>REGISTER</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="regUsername">Username</label>
          <input type="text" ref={usernameRef} id="regUsername" />
        </div>

        <div>
          <label htmlFor="regPassword">Password</label>
          <input type="password" ref={passwordRef} id="regPassword" />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>

  );
}