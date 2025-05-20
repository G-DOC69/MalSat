import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 48px 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #1e293b;
`;

export const ResultCount = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #475569;
`;

export const LoadingText = styled.div`
  font-size: 18px;
  text-align: center;
  color: #94a3b8;
`;

export const ErrorText = styled.div`
  font-size: 18px;
  text-align: center;
  color: #ef4444;
`;

export const EmptyText = styled.div`
  font-size: 18px;
  text-align: center;
  color: #64748b;
`;

export const BackToTopButton = styled.button`
  position: fixed;
  bottom: 40px;
  right: 30px;
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
  color: white;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  transition: opacity 0.2s ease, transform 0.2s ease;

  &:hover {
    opacity: 0.95;
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.97);
  }
`;
