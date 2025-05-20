import styled from "styled-components";

export const AdCardStyled = styled.div`
  background: white;
  padding: 14px;
  border-radius: 12px;
  cursor: pointer;
  border: 1px solid #dbeafe;
  box-shadow: 0 0 0 transparent;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
  
  &:hover {
    border-color: #3b82f6;
    box-shadow: 0 0 18px rgba(59, 130, 246, 0.4);
  }
`;

export const AdImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
`;

export const AdTitle = styled.h2`
  font-size: 18px;
  font-weight: 700; /* ⬅ стало жирнее */
  margin: 8px 0 4px;
  color: #1e3a8a;
`;


export const AdText = styled.p`
  font-size: 14px;
  color: #475569;
  margin: 2px 0;
`;

export const Price = styled.div`
  margin-top: auto;
  padding-top: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #22c55e;
`;

