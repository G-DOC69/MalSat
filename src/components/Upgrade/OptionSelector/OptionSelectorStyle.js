import styled from 'styled-components';

export const Section = styled.div`
    margin-bottom: 2rem;
`;

export const Title = styled.h3`
    margin-bottom: 1rem;
`;

export const Select = styled.div`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
`;

export const OptionButton = styled.button`
    padding: 0.6rem 1.2rem;
    background: #0077cc;
    color: white;
    border: none;
    cursor: pointer;

    &:disabled {
        background: #ccc;
        cursor: not-allowed;
    }
`;
