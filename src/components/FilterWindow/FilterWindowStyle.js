import styled from "styled-components";

export const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  background-color: #f9fafb;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.03);
  margin-bottom: 24px;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: 500;
  color: #334155;
  min-width: 140px;
`;

const fieldBase = `
  padding: 10px 12px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  background-color: white;
  transition: border 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
`;

export const Select = styled.select`
  ${fieldBase}
`;

export const Input = styled.input`
  ${fieldBase}
`;
