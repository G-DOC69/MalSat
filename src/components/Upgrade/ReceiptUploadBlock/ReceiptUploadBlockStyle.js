import styled from 'styled-components';

export const Section = styled.div`
    margin-bottom: 2rem;
`;

export const Title = styled.h3`
    margin-bottom: 1rem;
`;

export const QRImage = styled.img`
    display: block;
    width: 100%;
    max-width: 400px;
    margin: 1rem auto;
`;

export const Disclaimer = styled.p`
    font-size: 0.9rem;
    color: #444;
    margin-top: 1rem;
    line-height: 1.5;
`;

export const PriceTag = styled.p`
    font-size: 1.1rem;
    font-weight: bold;
    margin-top: 1rem;
`;

export const UploadInput = styled.input`
    margin-top: 1rem;
`;

export const SubmitButton = styled.button`
    margin-top: 1rem;
    padding: 0.6rem 1.4rem;
    background: green;
    color: white;
    border: none;
    cursor: pointer;

    &:disabled {
        background: #aaa;
        cursor: not-allowed;
    }
`;
