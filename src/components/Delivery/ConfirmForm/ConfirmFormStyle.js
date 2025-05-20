import styled from 'styled-components';

export const Form = styled.form`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const inputStyle = `
  padding: 10px 12px;
  font-size: 1rem;
  border-radius: 10px;
  border: 1px solid #cbd5e1;
  transition: 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59,130,246,0.3);
  }
`;

export const Select = styled.select`
  ${inputStyle}
`;

export const Input = styled.input`
  ${inputStyle}
`;

export const SubmitButton = styled.button`
  padding: 12px;
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

export const ErrorText = styled.p`
  color: #dc2626;
  font-size: 0.9rem;
  margin: 0;
`;
