import styled from "styled-components";

export const AdCardStyled = styled.div`
  background-color: #f9fafb;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s ease, box-shadow 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  position: relative;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    background-color: #f0f9ff;
  }
`;

export const AdImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  background-color: #e2e8f0;
`;

export const AdContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const AdTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
`;

export const AdText = styled.p`
  font-size: 0.9rem;
  color: #475569;
`;

export const PriceTag = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: #10b981;
  margin-top: 0.5rem;
`;

export const PriorityBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: #fde68a;
  color: #1e293b;
  padding: 6px;
  font-size: 0.9rem;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
`;
