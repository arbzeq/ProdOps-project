import { ReactNode } from "react";
import { useAuth } from "../contexts";
import "../css/forms.css";
import { useNavigate } from "react-router-dom";


export function MyAccountPage(): ReactNode {
  const navigate = useNavigate();
  const userContext = useAuth();

  function handleRemoveAccount(){
    
    userContext.logout();
    navigate("/login");
  }
  return (
    <div className="myAccountPage">
      <form>
        <button onClick={handleRemoveAccount}>Remove account</button>
      </form>
    </div>

  );
}