import { Outlet } from 'react-router-dom';
import './css/App.css';
import { AuthProvider } from "./contexts";
import { Header } from "./components";

export function App() {

  return (
    <>
      <Header />
      <AuthProvider>
        <Outlet />
      </AuthProvider>
      
    </>
    
      
  )
}

export default App
