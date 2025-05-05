import styled from "styled-components";
import { Link } from "react-router-dom";

export const Button = styled(Link)`
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    background-color: #10b981;
    color: white;
    font-size: 36px;
    font-weight: bold;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    transition: background 0.3s;

    &:hover {
        background-color: #059669;
    }
`;
