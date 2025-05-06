import styled from "styled-components";

export const ImageSection = styled.div`
    flex: 1;
    min-width: 300px;
    text-align: center;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;

export const Image = styled.img`
    width: 100%;
    max-width: 350px;
    border-radius: 8px;
    object-fit: cover;
`;

export const NavButton = styled.button`
    background: #e2e8f0;
    border: none;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 18px;
    cursor: pointer;
    transition: background 0.3s;
    font-weight: bold;

    &:hover {
        background: #cbd5e1;
    }
`;
