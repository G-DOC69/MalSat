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

export const ReceiptBox = styled.div`
    background: white;
    border: 1px solid #bbb;
    border-radius: 6px;
    padding: 1rem;
    margin-bottom: 1.5rem;
`;

export const InfoText = styled.p`
    margin: 0.4rem 0;
`;

export const Photo = styled.img`
    width: 100%;
    max-width: 300px;
    cursor: pointer;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    border: 1px solid #ccc;
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

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ModalImage = styled.img`
    max-width: 90vw;
    max-height: 90vh;
    border: 2px solid white;
`;
