import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ColumnTitle = styled.h2`
    margin-bottom: 1rem;
`;

export const DeliveryCard = styled.div`
    border: 1px solid #ccc;
    padding: 1rem;
    margin-bottom: 1.5rem;
    border-radius: 8px;
    background: #f9f9f9;
`;

export const DeliveryInfo = styled.p`
    margin: 0.5rem 0;
`;

export const DeliveryLink = styled(Link)`
    display: block;
    margin-bottom: 0.5rem;
    color: #0077cc;
    text-decoration: underline;
`;

export const DeliveryButton = styled.button`
    margin-right: 0.5rem;
    padding: 0.4rem 0.8rem;
    cursor: pointer;
`;

export const DeliveryStatusText = styled.p`
    margin-top: 0.5rem;
    font-weight: bold;
`;
export const RefreshButtonRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
`;
