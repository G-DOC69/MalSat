import styled from "styled-components";

export const SellerSection = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
    padding: 10px;
    background: #f3f4f6;
    border-radius: 8px;
    text-decoration: none;
    color: inherit;
`;

export const SellerPhoto = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
`;

export const SellerName = styled.p`
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;