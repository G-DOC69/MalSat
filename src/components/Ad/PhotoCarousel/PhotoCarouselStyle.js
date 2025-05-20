import styled, { keyframes } from "styled-components";

// Анимация свечения
const glow = keyframes`
  0% {
    box-shadow: 0 0 10px #3b82f6, 0 0 20px #3b82f6;
  }
  50% {
    box-shadow: 0 0 20px #2563eb, 0 0 30px #2563eb;
  }
  100% {
    box-shadow: 0 0 10px #3b82f6, 0 0 20px #3b82f6;
  }
`;

export const CarouselWrapper = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 1rem;
  transform: scale(0.8);
  transform-origin: top center;
`;


export const ImageSection = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 24px;
  overflow: hidden;
  background: linear-gradient(145deg, #e0f2fe, #ffffff);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  animation: ${glow} 6s ease-in-out infinite;

  @media (max-width: 640px) {
    height: 250px;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.4s ease;
  background-color: #e2e8f0;
  border-radius: 24px;

  &:hover {
    transform: scale(1.03);
    filter: brightness(1.05);
  }
`;

export const NavButton = styled.button`
  position: absolute;
  top: 50%;
  ${({ position }) => (position === "left" ? "left: 1rem;" : "right: 1rem;")}
  transform: translateY(-50%);
  background: linear-gradient(145deg, #2563eb, #3b82f6);
  color: white;
  border: none;
  padding: 0.75rem 1.1rem;
  font-size: 1.5rem;
  border-radius: 50%;
  cursor: pointer;
  z-index: 2;
  transition: all 0.25s ease;
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.3);

  &:hover {
    transform: translateY(-50%) scale(1.1);
    background: linear-gradient(145deg, #1e40af, #3b82f6);
    box-shadow: 0 8px 25px rgba(37, 99, 235, 0.45);
  }

  @media (max-width: 640px) {
    font-size: 1.2rem;
    padding: 0.5rem 0.9rem;
  }
`;
