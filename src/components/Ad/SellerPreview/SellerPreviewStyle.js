import styled from "styled-components";

export const SellerSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background-color: #f1f5f9;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
  text-decoration: none;
  color: inherit;
  transition: background 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background-color: #e0e7ff;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
`;

export const SellerPhoto = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #cbd5e1;
`;

export const SellerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

export const SellerName = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const VerifiedBadge = styled.span`
  background-color: #10b981;
  color: white;
  font-size: 0.75rem;
  padding: 2px 6px;
  border-radius: 8px;
`;

export const SellerPhone = styled.p`
  font-size: 0.9rem;
  color: #475569;
`;