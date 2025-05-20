import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ColumnTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
`;

export const RefreshButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const DeliveryCard = styled.div`
  border: 1px solid #e2e8f0;
  padding: 1.2rem;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const DeliveryInfo = styled.p`
  margin: 0;
  font-size: 15px;
  font-weight: 500;
  color: #334155;
`;

export const DeliveryLink = styled(Link)`
  font-size: 14px;
  color: #2563eb;
  text-decoration: underline;
  width: fit-content;

  &:hover {
    color: #1d4ed8;
  }
`;

export const DeliveryButton = styled.button`
  padding: 8px 14px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-right: 0.5rem;
  transition: background 0.2s ease;

  &:hover {
    background-color: #1d4ed8;
  }

  &:disabled {
    background-color: #a5b4fc;
    cursor: not-allowed;
  }
`;

export const DeliveryStatusText = styled.p`
  margin-top: 0.5rem;
  font-size: 14px;
  font-weight: 500;
  color: #0f172a;
`;
