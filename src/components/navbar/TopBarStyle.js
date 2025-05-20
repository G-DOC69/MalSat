import styled, { keyframes } from "styled-components";

// === Фон с градиентом и затемнением ===
export const Navbar = styled.nav`
  width: 100%;
  padding: 1rem 2rem;
  background: linear-gradient(to right, #1e3a8a, #2563eb);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 50;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

// === Анимация логотипа (мягкое появление) ===
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  animation: ${fadeIn} 0.6s ease-out;
`;

export const LogoImg = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;

export const SiteTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
`;

export const NavList = styled.ul`
  display: flex;
  gap: 1rem;
  align-items: center;

  li {
    list-style: none;
  }
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.2s ease, color 0.2s;

  &:hover {
    transform: scale(1.1);
    color: #dbeafe;
  }
`;

export const NavButton = styled.button`
  background-color: white;
  color: #1e3a8a;
  border: none;
  padding: 0.5rem 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background-color: #e0e7ff;
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: scale(0.98);
  }
`;

// === Анимация появления SideMenu ===
const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0%);
    opacity: 1;
  }
`;

export const SideMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 260px;
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(6px);
  box-shadow: -4px 0 16px rgba(0, 0, 0, 0.1);
  padding: 2rem 1rem;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  animation: ${slideIn} 0.3s ease forwards;
`;

export const MenuLink = styled.button`
  background: none;
  border: none;
  font-size: 1.1rem;
  text-align: left;
  color: #1e293b;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: color 0.2s ease;

  &:hover {
    color: #1e3a8a;
    transform: translateX(2px);
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(30, 41, 59, 0.4);
  z-index: 99;
  backdrop-filter: blur(1px);
`;
