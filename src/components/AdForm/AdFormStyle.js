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
    font-weight: bold;
    margin-bottom: 5px;
`;

export const Input = styled.input`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
`;

export const TextArea = styled.textarea`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    min-height: 80px;
`;

export const Select = styled.select`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
`;

export const FileInput = styled.input``;

export const SubmitButton = styled.button`
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
`;

export const ReplaceButton = styled(SubmitButton)`
    background: #dc2626;

    &:hover {
        background: #ef4444;
    }
`;

export const ErrorText = styled.div`
    color: #dc2626;
    font-size: 14px;
`;

export const Note = styled.p`
    font-size: 12px;
    color: #6b7280;
    margin-top: 5px;
`;
