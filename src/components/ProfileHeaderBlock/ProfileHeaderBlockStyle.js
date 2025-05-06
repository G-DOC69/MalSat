import styled from "styled-components";

export const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    background: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    gap: 20px;
    margin-bottom: 20px;

    @media (max-width: 600px) {
        flex-direction: column;
        text-align: center;
    }
`;

export const HeaderPhoto = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
`;

export const HeaderInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;

    h2 {
        font-size: 32px;
    }
`;

export const EditButton = styled.button`
    background: #1e3a8a;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.3s;
    margin-top: 10px;

    &:hover {
        background: #3b82f6;
    }
`;
