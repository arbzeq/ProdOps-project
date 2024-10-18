import { Outlet } from 'react-router-dom';
import './css/App.css';
import { AuthProvider } from "./contexts";
import { Header, Footer } from "./components";

export function App() {

  return (
    <>
      <AuthProvider>
        <Header />
          <Outlet />
        <Footer />
      </AuthProvider>
    </>
    
      
  )
}

export default App
