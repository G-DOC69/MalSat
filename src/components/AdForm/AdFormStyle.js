import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 700px;
  margin: 40px auto;
  padding: 32px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
`;

export const FieldSet = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-weight: 600;
  margin-bottom: 6px;
  color: #1e293b;
`;

const inputBase = `
  padding: 10px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 15px;
  background-color: #fff;
  transition: border 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
    outline: none;
  }
`;

export const Input = styled.input`
  ${inputBase}
`;

export const TextArea = styled.textarea`
  ${inputBase}
  min-height: 100px;
  resize: vertical;
`;

export const Select = styled.select`
  ${inputBase}
`;

export const FileInput = styled.input`
  margin-top: 6px;
`;

export const SubmitButton = styled.button`
  background-color: #2563eb;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: background 0.3s;

  &:hover {
    background-color: #1d4ed8;
  }

  &:disabled {
    background-color: #93c5fd;
    cursor: not-allowed;
  }
`;

export const ReplaceButton = styled(SubmitButton)`
  background-color: #dc2626;

  &:hover {
    background-color: #b91c1c;
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
