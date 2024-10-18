import { ReactNode } from "react";
import { Link } from "react-router-dom";
import "../css/Header.css";
import { useAuth } from "../contexts";

export function Header() : ReactNode {

  let userContext = useAuth();

  function handleLogout() {
    userContext.logout();
  }
  return (
    <div className="header">
      <div className="headerContainer">
        <h1>ProdOps</h1>
        <nav>
          <Link to="register">Register</Link>
          <Link to="order">Order</Link>

          {
            userContext.isLoggedIn ? 
            <Link to="/login" onClick={handleLogout}>Logout</Link>
            :
            <Link to="/login">Login</Link>
          }
        </nav>
      </div>
    </div>   
  );
}