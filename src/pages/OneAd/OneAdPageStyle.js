import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 32px;
  padding: 40px 24px;
  max-width: 1200px;
  margin: 100px auto 40px;
`;

export const InfoSection = styled.div`
  flex: 1;
  min-width: 300px;
`;

export const ImageSection = styled.div`
  flex: 1;
  min-width: 300px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 16px;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 24px;

  li {
    padding: 8px 0;
    font-size: 16px;
    color: #334155;
  }
`;

export const Button = styled.button`
  background: #1e3a8a;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  margin-top: 16px;
  transition: background 0.3s;

  &:hover {
    background: #3b82f6;
  }
`;

export const DeliveryForm = styled.form`
  margin-top: 20px;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #f9f9f9;
`;

export const FormGroup = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 6px;
    font-weight: 500;
  }
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #666;
  }
`;

export const ErrorText = styled.p`
  color: #d00000;
  margin: 10px 0;
  font-weight: bold;
`;

export const FavoriteButton = styled.button`
  background: ${({ disabled }) => (disabled ? "#94a3b8" : "#065f46")};
  color: white;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  width: 100%;
  margin-top: 10px;
  transition: background 0.3s;

  &:hover:not(:disabled) {
    background: #10b981;
  }
`;
