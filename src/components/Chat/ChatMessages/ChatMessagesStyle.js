import styled from "styled-components";

export const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  background: #f9fafb;
`;

export const Message = styled.div`
  max-width: 70%;
  padding: 10px 14px;
  margin-bottom: 12px;
  border-radius: 16px;
  font-size: 0.95rem;
  line-height: 1.4;
  align-self: ${({ sender }) => (sender === "me" ? "flex-end" : "flex-start")};
  background: ${({ sender }) => (sender === "me" ? "#3b82f6" : "#e2e8f0")};
  color: ${({ sender }) => (sender === "me" ? "#fff" : "#1e293b")};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  animation: slideIn 0.2s ease;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
