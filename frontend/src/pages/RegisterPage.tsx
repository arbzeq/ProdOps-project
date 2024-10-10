import { ReactNode, useRef } from "react";
import { useAuth } from "../contexts";
import { createUser } from "../api";

export function RegisterPage(): ReactNode {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const context = useAuth();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if(usernameRef.current && passwordRef.current){
      try {
        let createUserResponse = await createUser(usernameRef.current.value, passwordRef.current.value);
        switch (createUserResponse.status) {
          case 201:
            console.log("User succesfully created!");
            break;
          case 409:
            console.log("User already exists!");
            break;
        }

      } catch(error){
        console.log("Register Error");
        console.error(error);
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