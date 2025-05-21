import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

export const FieldSet = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #1e3a8a;
    outline: none;
  }
`;

export const Select = styled.select`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border-color: #1e3a8a;
    outline: none;
  }
`;

export const SubmitButton = styled.button`
  background: #1e3a8a;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #3b82f6;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export const PreviewImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin: 10px auto;
  display: block;
`;

export const ErrorText = styled.div`
  color: #e63946;
  font-size: 13px;
  margin-top: 4px;
`;
