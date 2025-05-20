import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routers from './app/Routers.jsx';
import { createContext, useState } from 'react';
import Topbar from './components/navbar/TopBar';

// Глобальное хранилище пользователя
export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(false);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {/* 🌄 Основной фон (изображение на весь экран) */}
      <div className="relative w-full min-h-screen overflow-hidden">
        
        {/* 📸 Фон-картинка с фиксированной позицией */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed z-0"
          style={{ backgroundImage: "url('/background.jpg')" }}
        ></div>

        {/* 🌓 Затемняющая полупрозрачная вуаль с мягким блюром */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-md z-0"></div>

        {/* ⚙️ Основной контент поверх фона */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Topbar />
          <main className="flex-1 px-4 py-6">
            <Routers />
          </main>
        </div>
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
