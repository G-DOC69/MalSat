import styled, { keyframes } from "styled-components";

// Анимация свечения формы
const formPulse = keyframes`
  0% {
    box-shadow: 0 0 10px rgba(37, 99, 235, 0.2);
  }
  50% {
    box-shadow: 0 0 20px rgba(37, 99, 235, 0.3);
  }
  100% {
    box-shadow: 0 0 10px rgba(37, 99, 235, 0.2);
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 700px;
  margin: 40px auto;
  padding: 32px;
  background: linear-gradient(145deg, #f0f9ff, #ffffff);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
  transform: scale(0.8);
  transform-origin: top center;
  animation: ${formPulse} 6s ease-in-out infinite;
`;

export const FieldSet = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-weight: 600;
  margin-bottom: 6px;
  color: #1e40af;
`;

const inputBase = `
  padding: 12px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  font-size: 15px;
  background-color: #ffffff;
  transition: all 0.25s ease;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.25);
    outline: none;
  }
`;

export const Input = styled.input`
  ${inputBase}
`;

export const TextArea = styled.textarea`
  ${inputBase}
  min-height: 110px;
  resize: vertical;
`;

export const Select = styled.select`
  ${inputBase}
`;

export const FileInput = styled.input`
  margin-top: 6px;
`;

export const SubmitButton = styled.button`
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
    box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
  }

  &:disabled {
    background-color: #93c5fd;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export const ReplaceButton = styled(SubmitButton)`
  background: linear-gradient(145deg, #dc2626, #ef4444);

  &:hover {
    background: linear-gradient(145deg, #b91c1c, #ef4444);
  }
`;

export const ErrorText = styled.div`
  color: #dc2626;
  font-size: 14px;
  margin-top: 6px;
`;

export const Note = styled.p`
  font-size: 13px;
  color: #6b7280;
  margin-top: 6px;
`;
