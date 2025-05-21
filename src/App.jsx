import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routers from './app/Routers.jsx';
import { createContext, useState } from 'react';
import Topbar from "./components/navbar/TopBar";
import Footer from "./components/Footer/Footer";

export const UserContext = createContext();

function App() {
    const [user, setUser] = useState(false);
  
    return (
      <UserContext.Provider value={[user, setUser]}>
        <div className="page-wrapper">
          <Topbar />
          <main className="main-content">
            <Routers />
          </main>
          <Footer />
        </div>
      </UserContext.Provider>
    );
  }
  
  

export default function WrappedApp() {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
}
