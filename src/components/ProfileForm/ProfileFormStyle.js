import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const FieldSet = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Label = styled.label`
    text-align: left;
    font-size: 14px;
    font-weight: bold;
`;

export const Input = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 14px;
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
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
        background: #3b82f6;
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

export const Select = styled.select`
    padding: 8px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 4px;
`;

export const ErrorText = styled.div`
    color: red;
    font-size: 0.875rem;
    margin-top: 4px;
`;
