import styled from "styled-components";

export const AdCardStyled = styled.div`
  background: white;
  padding: 16px;
  border-radius: 16px;
  cursor: pointer;
  border: 1px solid #dbeafe;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.02);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: #3b82f6;
    box-shadow: 0 12px 24px rgba(59, 130, 246, 0.2);
    transform: translateY(-4px);
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      rgba(59, 130, 246, 0.1) 0%,
      transparent 50%,
      rgba(59, 130, 246, 0.1) 100%
    );
    transition: all 0.6s ease;
    pointer-events: none;
  }

  &:hover::after {
    left: 100%;
  }
`;

export const AdImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
  transition: transform 0.3s ease;

  ${AdCardStyled}:hover & {
    transform: scale(1.03);
  }
`;

export const AdTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin: 12px 0 4px;
  color: #1e3a8a;
`;

export const AdText = styled.p`
  font-size: 14px;
  color: #475569;
  margin: 2px 0;
`;

export const Price = styled.div`
  margin-top: auto;
  padding-top: 12px;
  font-size: 16px;
  font-weight: 600;
  color: #22c55e;
  text-align: right;
`;
