import styled from "styled-components";

// === Навбар с градиентом, тенью и липкостью ===
export const Navbar = styled.nav`
  width: 100%;
  height: 64px;
  background: linear-gradient(90deg, #1e3a8a, #3b82f6);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  padding: 0 24px;
  color: white;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

// === Название сайта — центрировано и кликабельно ===
export const SiteTitle = styled.h1`
  font-size: 1.6rem;
  font-weight: 700;
  cursor: pointer;
  flex-grow: 1;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

// === Кнопки меню справа ===
export const NavList = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  gap: 20px;
`;

// === Кнопки входа/регистрации ===
export const NavButton = styled.button`
  background-color: white;
  color: #1e3a8a;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e0e7ff;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

// === Иконки (чат, профиль и т.д.) ===
export const IconButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.4rem;
  cursor: pointer;
  transition: transform 0.2s ease, color 0.2s ease;

  &:hover {
    transform: scale(1.15);
    color: #dbeafe;
  }
`;

// === Боковое меню (мобилка или бургер) ===
export const SideMenu = styled.div`
  position: fixed;
  top: 64px;
  right: 0;
  background: white;
  width: 260px;
  height: calc(100% - 64px);
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.15);
  z-index: 999;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  animation: slideIn 0.3s ease forwards;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0%);
    }
  }
`;

// === Ссылки в сайдменю ===
export const MenuLink = styled.button`
  background: none;
  border: none;
  color: #1e293b;
  font-size: 1.05rem;
  text-align: left;
  padding: 6px 0;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #1e3a8a;
    transform: translateX(4px);
  }
`;
