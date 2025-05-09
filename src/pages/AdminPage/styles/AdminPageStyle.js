import styled from 'styled-components';

export const Container = styled.div`
    max-width: 1200px;
    margin: 2rem auto;
    padding: 2rem;
    background: #fdfdfd;
`;

export const StartButton = styled.button`
    padding: 0.8rem 1.6rem;
    background: #0077cc;
    color: white;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 4px;
    margin-bottom: 1rem;
`;

export const ActionButton = styled.button`
    padding: 0.6rem 1.2rem;
    background: #005fa3;
    color: white;
    border: none;
    font-size: 0.95rem;
    cursor: pointer;
    border-radius: 4px;
    margin: 0 0.5rem 1.5rem 0;
`;

export const ErrorText = styled.p`
    color: red;
    font-weight: bold;
    margin-top: 1rem;
`;
