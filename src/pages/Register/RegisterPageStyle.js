import styled from "styled-components";

export const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f4f8;
  flex-direction: column;
`;

export const RegisterForm = styled.form`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Title = styled.h2`
  text-align: center;
  color: #1e3a8a;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;

  @media (max-width: 600px) {
    padding: 10px;
    font-size: 14px;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
`;

export const Button = styled.button`
  background: #1e3a8a;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #3b82f6;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: -10px;
  text-align: left;
`;

export const RegisterLinks = styled.div`
  margin-top: 12px;
  text-align: center;

  a {
    color: #1e3a8a;
    text-decoration: none;
    font-size: 14px;

    &:hover {
      text-decoration: underline;
    }
  }
`;
