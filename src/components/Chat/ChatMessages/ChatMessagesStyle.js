import styled from "styled-components";

export const MessagesContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
`;

export const Message = styled.div`
    max-width: 70%;
    padding: 8px 12px;
    border-radius: 15px;
    margin-bottom: 8px;
    align-self: ${({ sender }) => (sender === "me" ? "flex-end" : "flex-start")};
    background: ${({ sender }) => (sender === "me" ? "#3b82f6" : "#e2e8f0")};
    color: ${({ sender }) => (sender === "me" ? "white" : "black")};
`;
