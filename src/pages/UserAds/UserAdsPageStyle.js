import styled, { keyframes } from "styled-components";

// Анимация появления контейнера
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Анимация появления карточек
const zoomIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const Container = styled.div`
  max-width: 1240px;
  margin: 100px auto;
  padding: 80px 16px 40px;
  animation: ${fadeIn} 0.6s ease forwards;
`;


export const AdsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
  align-items: stretch;
  animation: ${zoomIn} 0.3s ease-out;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;
