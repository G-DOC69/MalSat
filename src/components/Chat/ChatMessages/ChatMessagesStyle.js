import styled from "styled-components";

export const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #f8fafc;
`;

export const Message = styled.div`
  max-width: 70%;
  padding: 10px 14px;
  border-radius: 16px;
  font-size: 14.5px;
  line-height: 1.4;
  align-self: ${({ sender }) => (sender === "me" ? "flex-end" : "flex-start")};
  background-color: ${({ sender }) =>
    sender === "me" ? "#2563eb" : "#e2e8f0"};
  color: ${({ sender }) => (sender === "me" ? "#ffffff" : "#1e293b")};

  border-bottom-right-radius: ${({ sender }) =>
    sender === "me" ? "0" : "16px"};
  border-bottom-left-radius: ${({ sender }) =>
    sender === "me" ? "16px" : "0"};
`;
