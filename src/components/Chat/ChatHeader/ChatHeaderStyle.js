import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  background-color: #f9fafb;
  border-bottom: 1px solid #e2e8f0;
`;

export const InfoBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export const HeaderImage = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 50%;
  background-color: #e2e8f0;
`;

export const NameText = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #1e293b;
`;

export const RefreshButton = styled.button`
  margin-left: 10px;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 500;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: #1d4ed8;
  }
`;