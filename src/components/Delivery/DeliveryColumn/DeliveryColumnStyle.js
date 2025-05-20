import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ColumnTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1e293b;
`;

export const DeliveryCard = styled.div`
  border: 1px solid #e2e8f0;
  padding: 1rem 1.25rem;
  margin-bottom: 1.5rem;
  border-radius: 14px;
  background: #f8fafc;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  }
`;

export const DeliveryInfo = styled.p`
  margin: 0.5rem 0;
  font-size: 1rem;
  font-weight: 500;
  color: #334155;
`;

export const DeliveryLink = styled(Link)`
  display: inline-block;
  margin: 0.5rem 0;
  font-size: 0.95rem;
  color: #3b82f6;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
    color: #1d4ed8;
  }
`;

export const DeliveryButton = styled.button`
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
  background: #e0e7ff;
  color: #1e3a8a;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #c7d2fe;
  }
`;

export const DeliveryStatusText = styled.p`
  margin-top: 0.5rem;
  font-weight: 600;
  color: #0f172a;
  font-size: 0.95rem;
`;

export const RefreshButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;
