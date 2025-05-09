import styled from 'styled-components';

export const FullViewContainer = styled.div`
    background: #f5f5f5;
    padding: 1.5rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-top: 1rem;
`;

export const AdImage = styled.img`
    width: 100%;
    max-width: 400px;
    height: auto;
    margin-bottom: 1rem;
`;

export const AdDetails = styled.div`
    margin-bottom: 1rem;
`;

export const DetailRow = styled.p`
    margin: 0.4rem 0;
`;

export const DeleteButton = styled.button`
    padding: 0.5rem 1rem;
    background: red;
    color: white;
    border: none;
    cursor: pointer;
`;

export const CollapseButton = styled.button`
    float: right;
    margin-bottom: 1rem;
    padding: 0.4rem 0.8rem;
    background: #aaa;
    color: white;
    border: none;
    cursor: pointer;
`;
