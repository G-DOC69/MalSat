import styled from "styled-components";

export const Container = styled.div`
  max-width: 400px;
  margin: 80px auto;
  padding: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
`;

export const Title = styled.h2`
  margin-bottom: 24px;
  color: #1e3a8a;
  font-size: 24px;
  font-weight: 700;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 14px;
  text-align: left;
  color: #1e293b;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 15px;
  box-sizing: border-box;
  margin-bottom: 20px;
  transition: border 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
    outline: none;
  }
`;

export const Button = styled.button`
  background: #1e3a8a;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  width: 100%;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #3b82f6;
  }

  &:disabled {
    background: #94a3b8;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  color: #dc2626;
  font-weight: 500;
  margin-top: 12px;
`;

export const SuccessMessage = styled.div`
  color: #16a34a;
  font-weight: 600;
  margin-top: 24px;
  font-size: 16px;
`;
