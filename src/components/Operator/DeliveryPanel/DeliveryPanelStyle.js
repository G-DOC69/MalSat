import styled from 'styled-components';

export const PanelSection = styled.div`
    flex: 1;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background: #f4f4f4;
    height: 95vh;
    overflow-y: auto;
`;

export const PanelTitle = styled.h2`
    margin-bottom: 1rem;
`;

export const FilterSelect = styled.select`
    margin-bottom: 1rem;
    padding: 0.4rem;
    font-size: 1rem;
`;

export const DeliveryBox = styled.div`
    background: white;
    border: 1px solid #bbb;
    border-radius: 6px;
    padding: 1rem;
    margin-bottom: 1rem;
`;

export const InfoText = styled.p`
    margin: 0.4rem 0;
`;

export const StatusButton = styled.button`
    margin-right: 0.5rem;
    padding: 0.4rem 0.8rem;
    cursor: pointer;
`;

export const RefreshButton = styled.button`
    margin-bottom: 1rem;
    margin-left: 1rem;
    padding: 0.4rem 0.8rem;
    cursor: pointer;
`;
