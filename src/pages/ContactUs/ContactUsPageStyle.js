import styled from 'styled-components';

export const Container = styled.div`
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
    background: #f7f7f7;
    border-radius: 8px;
`;

export const Title = styled.h2`
    text-align: center;
    margin-bottom: 2rem;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

export const Label = styled.label`
    margin-bottom: 0.5rem;
    font-weight: bold;
`;

export const Input = styled.input`
    padding: 0.5rem;
    margin-bottom: 1.5rem;
    border: 1px solid #ccc;
`;

export const Select = styled.select`
    padding: 0.5rem;
    margin-bottom: 1.5rem;
    border: 1px solid #ccc;
`;

export const TextArea = styled.textarea`
    padding: 0.5rem;
    margin-bottom: 1.5rem;
    border: 1px solid #ccc;
`;

export const SubmitButton = styled.button`
    padding: 0.75rem;
    background: #0077cc;
    color: white;
    border: none;
    cursor: pointer;
`;

export const Message = styled.p`
    margin-top: 1rem;
    color: ${props => (props.error ? 'red' : 'green')};
    font-weight: bold;
`;
