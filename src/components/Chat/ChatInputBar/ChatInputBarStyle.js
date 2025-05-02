import styled from "styled-components";

export const InputContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    border-top: 1px solid #ddd;
    background: #f8fafc;
`;

export const ChatInput = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
`;

export const SendButton = styled.button`
    background: #1e3a8a;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 8px;
    font-size: 14px;
    margin-left: 10px;
    cursor: pointer;
    transition: background 0.3s;

    &:disabled {
        background: #94a3b8;
        cursor: not-allowed;
    }

    &:hover:not(:disabled) {
        background: #3b82f6;
    }
`;

export const LimitWarning = styled.p`
    color: red;
    text-align: center;
    font-size: 13px;
    margin: 5px 0;
`;
