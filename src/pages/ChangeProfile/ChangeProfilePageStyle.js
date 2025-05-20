import styled from "styled-components";

export const FormContainer = styled.div`
    max-width: 400px;
    margin: auto;
    margin: 80 px;
    padding: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
`;

export const Title = styled.h2`
    margin-bottom: 20px;
    color: #1e3a8a;
`;

export const ErrorMessage = styled.div`
    color: red;
    font-size: 14px;
    margin-top: 10px;
`;

export const ForgotPassword = styled.p`
    font-size: 14px;
    margin-top: 10px;

    a {
        color: #1e3a8a;
        text-decoration: none;
        font-weight: bold;

        &:hover {
            text-decoration: underline;
        }
    }
`;
