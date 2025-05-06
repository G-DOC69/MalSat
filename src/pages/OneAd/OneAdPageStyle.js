import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
    max-width: 1000px;
    margin: auto;
`;

export const InfoSection = styled.div`
    flex: 1;
    min-width: 300px;
`;

export const Title = styled.h1`
    font-size: 24px;
    color: #1e3a8a;
`;

export const List = styled.ul`
    list-style: none;
    padding: 0;
    li {
        padding: 6px 0;
        font-size: 16px;
    }
`;

export const ImageSection = styled.div`
    flex: 1;
    min-width: 300px;
    text-align: center;
    position: relative;
`;

export const Image = styled.img`
    width: 100%;
    max-width: 350px;
    border-radius: 8px;
    object-fit: cover;
`;

export const NavButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: white;
    border: 1px solid #ccc;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    cursor: pointer;
    font-weight: bold;

    &:first-of-type {
        left: 10px;
    }

    &:last-of-type {
        right: 10px;
    }
`;

export const Button = styled.button`
    background: #1e3a8a;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
    margin-top: 20px;

    &:hover {
        background: #3b82f6;
    }
`;

export const SellerSection = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
    padding: 10px;
    background: #f3f4f6;
    border-radius: 8px;
    text-decoration: none;
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
    color: #1e3a8a;

    &:hover {
        text-decoration: underline;
    }
`;
export const FavoriteButton = styled.button`
    background: ${({ disabled }) => (disabled ? "#94a3b8" : "#065f46")};
    color: white;
    padding: 10px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
    width: 100%;
    margin-top: 10px;
    transition: background 0.3s;

    &:hover:not(:disabled) {
        background: #10b981;
    }
`;
