import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { IAuthContext }from "../interfaces/interfaces.ts";

interface IAuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export function AuthProvider( {children} : IAuthProviderProps) {


  useEffect(() => {
    localStorage.setItem('logs', JSON.stringify(["AuthContext Mount!"]));
    
  }, [])

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  function login(username: string, isAdmin: boolean) {
    setLoggedIn(true);
    setUsername(username);
    setIsAdmin(isAdmin);
  }

  function logout() {
    setLoggedIn(false);
    setUsername("");
    setIsAdmin(false);
  }

  const initialContextObject = {isLoggedIn, login, logout, username, isAdmin};

  return (
    <AuthContext.Provider value={initialContextObject}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() : IAuthContext {
  const context = useContext(AuthContext);
  if(!context){
    throw new Error("You are using AuthContext outside a Provider");
  }
  return context;
}


