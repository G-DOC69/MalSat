import styled from 'styled-components';

export const Form = styled.form`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: #f9fafb;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
`;

export const Select = styled.select`
  padding: 12px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  background-color: white;
  transition: border 0.2s ease;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
`;

export const Input = styled.input`
  padding: 12px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  background-color: white;
  transition: border 0.2s ease;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
`;

export const SubmitButton = styled.button`
  padding: 12px;
  background-color: #2563eb;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #1d4ed8;
  }

  &:disabled {
    background-color: #93c5fd;
    cursor: not-allowed;
  }
`;

export const ErrorText = styled.p`
  color: #dc2626;
  font-size: 0.875rem;
  margin: 0;
`;
