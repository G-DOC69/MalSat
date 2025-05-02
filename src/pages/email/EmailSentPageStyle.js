import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100vh;
    padding: 20px;
    font-size: clamp(16px, 2vw, 24px);
    background-color: #f9fafb;
`;

export const Message = styled.p`
    margin-bottom: 20px;
    color: #111827;
`;

export const StyledLink = styled(Link)`
    font-size: clamp(14px, 1.5vw, 20px);
    color: #1e3a8a;
    text-decoration: none;
    font-weight: 600;

    &:hover {
        text-decoration: underline;
        color: #2563eb;
    }
`;
