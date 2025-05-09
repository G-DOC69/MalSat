import styled from 'styled-components';

export const ChatViewContainer = styled.div`
    background: #f5f5f5;
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 8px;
    margin-top: 1rem;
`;

export const CollapseButton = styled.button`
    float: right;
    margin-bottom: 1rem;
    padding: 0.4rem 0.8rem;
    background: #aaa;
    color: white;
    border: none;
    cursor: pointer;
`;

export const ChatHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
`;

export const ChatUsers = styled.div`
    display: flex;
    gap: 2rem;
    margin-bottom: 1rem;
`;

export const UserBox = styled.div`
    text-align: center;
`;

export const UserPhoto = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 0.5rem;
`;

export const MessageList = styled.div`
    background: #fff;
    padding: 1rem;
    border-radius: 6px;
    margin-bottom: 1rem;
    max-height: 300px;
    overflow-y: auto;
`;

export const MessageItem = styled.div`
    margin-bottom: 0.8rem;
    border-bottom: 1px solid #eee;
    padding-bottom: 0.5rem;
`;

export const DeleteButton = styled.button`
    padding: 0.6rem 1rem;
    background: red;
    color: white;
    border: none;
    cursor: pointer;
`;
