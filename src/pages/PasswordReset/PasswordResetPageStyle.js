import styled from "styled-components";

export const Container = styled.div`
    max-width: 400px;
    margin: auto;
    padding: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
`;

export const Title = styled.h2`
    margin-bottom: 20px;
    color: #1e3a8a;
`;

export const Label = styled.label`
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 14px;
    text-align: left;
`;

export const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 14px;
    box-sizing: border-box;
    margin-bottom: 15px;
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
    color: red;
    font-weight: bold;
    margin-top: 10px;
`;

export const SuccessMessage = styled.div`
    color: green;
    font-weight: bold;
    margin-top: 20px;
`;
