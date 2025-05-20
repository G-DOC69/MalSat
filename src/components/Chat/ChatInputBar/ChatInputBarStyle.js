import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-top: 1px solid #e2e8f0;
  background-color: #f9fafb;
`;

export const ChatInput = styled.input`
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 15px;
  background-color: white;
  transition: border 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
    outline: none;
  }
`;

export const SendButton = styled.button`
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  margin-left: 12px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:disabled {
    background-color: #cbd5e1;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #1d4ed8;
  }
`;

export const LimitWarning = styled.p`
  color: #dc2626;
  text-align: center;
  font-size: 13px;
  margin: 4px 0;
`;
