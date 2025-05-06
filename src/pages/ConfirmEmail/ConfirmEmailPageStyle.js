import styled from "styled-components";
import { Link } from "react-router-dom";

export const PageContainer = styled.div`
    max-width: 600px;
    margin: 80px auto;
    padding: 40px 20px;
    text-align: center;
    background: #f9f9f9;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const Message = styled.h2`
    font-size: 24px;
    margin-bottom: 20px;
    color: #1e3a8a;
`;

export const Subtitle = styled.p`
    font-size: 16px;
    margin-bottom: 20px;
    color: #555;
`;

export const StyledLink = styled(Link)`
    display: inline-block;
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #1e3a8a;
    color: white;
    border-radius: 8px;
    text-decoration: none;
    font-weight: bold;
    transition: background 0.3s;

    &:hover {
        background-color: #3b82f6;
    }
`;
