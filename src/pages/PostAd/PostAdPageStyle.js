import styled, { keyframes } from "styled-components";

// Анимация появления
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  padding: 32px;
  max-width: 960px;
  margin: 100px auto 40px;
  background: #f8fafc;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  animation: ${fadeIn} 0.4s ease;
`;

export const FormSection = styled.div`
  flex: 1;
  min-width: 300px;
`;

export const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 24px;
  text-align: center;
`;
