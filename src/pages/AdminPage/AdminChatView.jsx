import { useState } from 'react';
import { deleteChatAdmin } from '../../app/adminApi.js';
import {
    ChatViewContainer,
    CollapseButton,
    ChatHeader,
    ChatUsers,
    UserBox,
    UserPhoto,
    MessageList,
    MessageItem,
    DeleteButton
} from './styles/AdminChatViewStyle';

const AdminChatView = ({ chat, token }) => {
    const [visible, setVisible] = useState(true);
    const [deleted, setDeleted] = useState(false);

    const handleDelete = async () => {
        await deleteChatAdmin(chat.chatId, token);
        setDeleted(true);
    };

    if (!visible) return null;
    if (deleted) return <p>Чат удалён.</p>;

    return (
        <ChatViewContainer>
            <CollapseButton onClick={() => setVisible(false)}>Скрыть</CollapseButton>
            <ChatHeader>
                <h3>{chat.animal} — {chat.breed} ({chat.price} сом)</h3>
                <img src={chat.adPhoto} alt="Ad" width="150" />
            </ChatHeader>

            <ChatUsers>
                <UserBox>
                    <UserPhoto src={chat.seller.photoUrl} alt="Seller" />
                    <p>Продавец: {chat.seller.username}</p>
                </UserBox>
                <UserBox>
                    <UserPhoto src={chat.customer.photoUrl} alt="Customer" />
                    <p>Покупатель: {chat.customer.username}</p>
                </UserBox>
            </ChatUsers>

            <MessageList>
                {chat.messages.map((msg, index) => (
                    <MessageItem key={index}>
                        <p><strong>{msg.senderName}:</strong> {msg.content}</p>
                        <small>{new Date(msg.timestamp).toLocaleString()}</small>
                    </MessageItem>
                ))}
            </MessageList>

            <DeleteButton onClick={handleDelete}>Удалить чат</DeleteButton>
        </ChatViewContainer>
    );
};

export default AdminChatView;
