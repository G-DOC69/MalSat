import styled from 'styled-components';

export const ChatListContainer = styled.div`
    margin-top: 1rem;
`;

export const ChatCard = styled.div`
    display: flex;
    align-items: flex-start;
    background: #fff;
    border: 1px solid #ccc;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 6px;
`;

export const ChatImage = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-right: 1rem;
`;

export const ChatInfo = styled.div`
    flex: 1;
    margin-right: 1rem;
`;

export const ActionButton = styled.button`
    padding: 0.4rem 0.8rem;
    background: #0077cc;
    color: white;
    border: none;
    cursor: pointer;
`;
