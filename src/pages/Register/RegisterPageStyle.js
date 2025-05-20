import styled, { keyframes } from "styled-components";

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

export const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to bottom right, #e0f2fe, #f8fafc);
  padding: 40px 16px;
  animation: ${fadeIn} 0.6s ease-out;
`;

export const RegisterForm = styled.form`
  background: white;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: ${fadeIn} 0.7s ease-in-out;
`;

export const Title = styled.h2`
  text-align: center;
  color: #1e3a8a;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
`;

export const Input = styled.input`
  padding: 14px 16px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  font-size: 15px;
  background-color: #ffffff;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.25);
    outline: none;
  }
`;

export const Select = styled.select`
  padding: 14px 16px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  font-size: 15px;
  background-color: #ffffff;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.25);
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
  width: 100%;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.3);

  &:hover {
    background: linear-gradient(145deg, #1d4ed8, #3b82f6);
  }

  &:disabled {
    background-color: #93c5fd;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export const ErrorMessage = styled.p`
  color: #dc2626;
  font-size: 14px;
  margin: 0;
  text-align: left;
`;

export const RegisterLinks = styled.div`
  text-align: center;
  font-size: 14px;
  margin-top: 10px;

  a {
    color: #1e3a8a;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;
