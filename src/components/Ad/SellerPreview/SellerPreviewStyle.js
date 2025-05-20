import styled, { keyframes } from "styled-components";

// Анимация свечения
const pulseGlow = keyframes`
  0% {
    box-shadow: 0 0 8px #2563eb;
  }
  50% {
    box-shadow: 0 0 16px #3b82f6;
  }
  100% {
    box-shadow: 0 0 8px #2563eb;
  }
`;

export const SellerSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: linear-gradient(145deg, #e0f2fe, #ffffff);
  border-radius: 16px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  transform: scale(0.8);
  transform-origin: top center;
  animation: ${pulseGlow} 5s infinite ease-in-out;

  &:hover {
    background: linear-gradient(145deg, #dbeafe, #f0f9ff);
    box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
    transform: scale(0.82);
  }
`;

export const SellerPhoto = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #cbd5e1;
  border: 2px solid #3b82f6;
  transition: transform 0.3s ease;

  ${SellerSection}:hover & {
    transform: scale(1.05);
  }
`;

export const SellerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

export const SellerName = styled.h4`
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e3a8a;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const VerifiedBadge = styled.span`
  background-color: #10b981;
  color: white;
  font-size: 0.75rem;
  padding: 2px 6px;
  border-radius: 8px;
`;

export const SellerPhone = styled.p`
  font-size: 0.95rem;
  color: #475569;
`;
