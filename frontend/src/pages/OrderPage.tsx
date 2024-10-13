import { ReactNode, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts";
import { userExists } from "../api.ts";

function isPositiveInteger() {

}
export function OrderPage(): ReactNode {
  const articleARef = useRef<HTMLInputElement>(null);
  const articleBRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const context = useAuth();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    //Look whether the user exists in database.
    if(articleARef.current && articleBRef.current){
      /*
      try {
        let validateUserResponse = await orderArticles(usernameRef.current.value, passwordRef.current.value);
        switch (validateUserResponse.status) {
          case 200:
            console.log("Login succesful!");
            context.login();
            
            navigate("order");
            break;
          case 401:
            console.log("Invalid password!");
            break;
          case 404:
            console.log("User does not exist!");
            break;
        }
      } catch(error){
        console.error("Login error");
        console.error(error);
      }
      */
    }
  }

  return (
    <div>
      <h1>ORDER</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="articleA">Article A</label>
          <input type="number" min="1" ref={articleARef} placeholder="Enter a positive integer."/>
        </div>

        <div>
          <label htmlFor="articleB">Article B</label>
          <input type="number" min="1" ref={articleBRef} placeholder="Enter a positive integer."/>
        </div>

        <button type="submit">Login</button>
      </form>

    </div>

  );
}