import { ReactNode, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts";
import { userAPI } from "../api.ts";

export function LoginPage(): ReactNode {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const context = useAuth();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    //Look whether the user exists in database.
    if(usernameRef.current && passwordRef.current){
      const userNameValue = usernameRef.current.value;
      const passwordValue = passwordRef.current.value;

      try {
        let apiResponse = await userAPI("validateUser", userNameValue, passwordValue);
        console.log(apiResponse);
      } catch(error){
        console.error("Login error");
        console.error(error);
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