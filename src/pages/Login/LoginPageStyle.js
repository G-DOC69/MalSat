import styled, { keyframes } from "styled-components";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #e0f2fe, #f8fafc);
  padding: 20px;
`;

export const LoginForm = styled.form`
  background: white;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: ${fadeInUp} 0.5s ease-out;
`;

export const Title = styled.h2`
  text-align: center;
  color: #1e3a8a;
  font-size: 24px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  font-size: 15px;
  transition: all 0.25s ease;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
    outline: none;
  }
`;

export const Button = styled.button`
  background: linear-gradient(145deg, #2563eb, #3b82f6);
  color: white;
  padding: 14px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.3s ease;
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.3);

  &:hover {
    background: linear-gradient(145deg, #1d4ed8, #3b82f6);
    box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
  }

  &:disabled {
    background-color: #93c5fd;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export const ErrorMessage = styled.div`
  color: #dc2626;
  text-align: center;
  font-size: 14px;
`;

export const LoginLinks = styled.div`
  margin-top: 12px;
  text-align: center;

  a {
    color: #1e3a8a;
    text-decoration: none;
    font-size: 14px;
    margin: 4px 0;
    display: inline-block;
    transition: color 0.2s ease;

    &:hover {
      text-decoration: underline;
      color: #3b82f6;
    }
  }
`;
