import { ReactNode } from "react";
import { Link } from "react-router-dom";
import "../css/Header.css";

export function Header() : ReactNode {
  return (
    <div className="header">
      <Link to="login">Login</Link>
      <Link to="register">Register</Link>
      <Link to="order">Order</Link>
    </div>   
  );
}