import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
    border: 1px solid #ccc;
    background: #f9f9f9;
`;

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

export const MessageBox = styled.div`
    margin-top: 2rem;
    padding: 1rem;
    background: #e6f7ff;
    border-left: 4px solid #1890ff;
`;

export const NavLinkButton = styled(Link)`
    display: inline-block;
    margin-right: 1rem;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background: #0077cc;
    color: white;
    text-decoration: none;
`;
