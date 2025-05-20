import styled, { keyframes } from "styled-components";

// Анимации
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const zoomIn = keyframes`
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

// Контейнер профиля
export const ProfileContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 80px auto;
  padding: 20px;
  animation: ${fadeIn} 0.6s ease forwards;
`;

// Заголовок для объявлений
export const AdsTitle = styled.h3`
  margin-top: 20px;
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  color: #1e3a8a;
  animation: ${fadeIn} 0.5s ease forwards;
`;

// Сетка объявлений
export const AdsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  padding: 10px;
  animation: ${zoomIn} 0.4s ease-in-out;
`;

// Кнопка "Загрузить ещё"
export const LoadMoreButton = styled.button`
  display: block;
  margin: 30px auto;
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
  color: white;
  padding: 14px 24px;
  border: none;
  border-radius: 10px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px) scale(1.02);
    opacity: 0.95;
    background: linear-gradient(135deg, #3b82f6, #1e3a8a);
  }

  &:active {
    transform: scale(0.98);
    opacity: 0.85;
  }
`;
