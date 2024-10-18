import { ReactNode } from "react";
import { useAuth } from "../contexts";
import "../css/forms.css";


export function MyAccountPage(): ReactNode {
  
  const user = useAuth();

  return (
    <div className="myAccountPage">
      <h2>MyAccountPage</h2>
    </div>

  );
}