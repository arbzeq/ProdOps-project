import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage, RegisterPage, OrderPage, MyAccountPage } from "./pages";
import { App } from "./App.tsx";

export function Router(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route element={<RegisterPage />} path="register" />
          <Route element={<LoginPage />} path="login" />
          <Route element={<OrderPage />} path="order" />
          <Route element={<MyAccountPage />} path="myaccount" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
} 