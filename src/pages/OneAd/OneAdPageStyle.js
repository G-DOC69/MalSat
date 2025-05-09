import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
    max-width: 1000px;
    margin: auto;
`;

export const InfoSection = styled.div`
    flex: 1;
    min-width: 300px;
`;

export const Title = styled.h1`
    font-size: 24px;
    color: #1e3a8a;
`;

export const List = styled.ul`
    list-style: none;
    padding: 0;
    li {
        padding: 6px 0;
        font-size: 16px;
    }
`;


export const Button = styled.button`
    background: #1e3a8a;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
    margin-top: 20px;

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
