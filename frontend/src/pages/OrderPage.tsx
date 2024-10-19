import { ReactNode, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts";
import "../css/forms.css";

export function OrderPage(): ReactNode {
  const articleARef = useRef<HTMLInputElement>(null);
  const articleBRef = useRef<HTMLInputElement>(null);
  const authContext = useAuth();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
  }

  return (
    <div className="orderPage">
      <h2>ORDER</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputContainer">
          <label htmlFor="articleA">Article A</label>
          <input type="number" min="1" ref={articleARef} placeholder="Enter a positive integer."/>
        </div>

        <div className="inputContainer">
          <label htmlFor="articleB">Article B</label>
          <input type="number" min="1" ref={articleBRef} placeholder="Enter a positive integer."/>
        </div>

        <button type="submit">Login</button>
      </form>

    </div>

  );
}