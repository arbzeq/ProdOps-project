import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage, RegisterPage } from "./pages";
import { App } from "./App.tsx";

export function Router(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<RegisterPage />}/>
          <Route element={<LoginPage />} path="login"/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
} 