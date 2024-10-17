import { createContext, ReactNode, useContext, useState } from "react";

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export function AuthProvider( {children} : IAuthProviderProps) {
  const [isLoggedIn, setLoggedIn] = useState(false);

  function login() {
    setLoggedIn(true);
  }

  function logout() {
    setLoggedIn(false);
  }

  const initialContextObject = {isLoggedIn, login, logout};

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


