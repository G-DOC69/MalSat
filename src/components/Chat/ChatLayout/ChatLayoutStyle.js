// src/components/Chat/ChatLayoutStyle.js
import styled from "styled-components";

export const ChatLayoutContainer = styled.div`
  display: flex;
  height: calc(100vh - 64px);
  margin-top: 64px;
`;

export const ChatMain = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;
