import styled from "styled-components";

export const Sidebar = styled.div`
  width: 260px;
  border-right: 1px solid #e2e8f0;
  background-color: #f9fafb;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
`;

export const ChatItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? "#e0f2fe" : "transparent")};
  transition: background 0.2s ease;

  &:hover {
    background-color: #e2e8f0;
  }
`;

export const ProfileImage = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #cbd5e1;
  margin-right: 12px;
`;

export const ChatInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ChatName = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: #1e293b;
  margin: 0;
`;