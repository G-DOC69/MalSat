import styled from "styled-components";

export const Sidebar = styled.div`
    width: fit-content;
    border-right: 1px solid #ddd;
    padding: 10px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    background: #f8fafc;
    gap: 5px;
`;

export const ChatItem = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    flex-direction: column;
    cursor: pointer;
    border: 1px solid #ccc;
    background: ${({ selected }) => (selected ? "#ddd" : "transparent")};
    transition: background 0.2s;
    border-radius: 8px;
    width: fit-content;

    &:hover {
        background: #e2e8f0;
    }
`;

export const ProfileImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
`;
