import styled from 'styled-components';

export const Form = styled.form`
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
`;

export const Select = styled.select`
    padding: 0.4rem;
    font-size: 1rem;
`;

export const Input = styled.input`
    padding: 0.5rem;
    font-size: 1rem;
`;

export const SubmitButton = styled.button`
    padding: 0.6rem;
    background: #0077cc;
    color: white;
    border: none;
    cursor: pointer;
`;

export const ErrorText = styled.p`
    color: red;
    font-size: 0.9rem;
    margin: 0;
`;
