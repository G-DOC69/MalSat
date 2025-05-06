import styled from "styled-components";

export const ProfileContainer = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: auto;
    padding: 20px;
`;

export const AdsTitle = styled.h3`
    margin-top: 20px;
    text-align: center;
`;

export const AdsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
    padding: 10px;
`;

export const LoadMoreButton = styled.button`
    display: block;
    margin: 20px auto;
    background: #1e3a8a;
    color: white;
    padding: 12px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
        background: #3b82f6;
    }
`;
