import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRout( props :ProtectedRouteProps) {
  
  return <>{props.children}</>

}