import { getChatAdmin } from '../../app/adminApi.js';
import {
    ChatListContainer,
    ChatCard,
    ChatInfo,
    ChatImage,
    ActionButton
} from './styles/AdminChatListStyle';

const AdminChatList = ({ chats, token, onSelectChat, onClearAd }) => {

    const handleSelectChat = async (chatId) => {
        const res = await getChatAdmin(chatId, token);
        onClearAd();
        onSelectChat(res.data);
    };

    return (
        <ChatListContainer>
            <h3>Чаты пользователя</h3>
            {chats.map(chat => (
                <ChatCard key={chat.id}>
                    <ChatImage src={chat.adPhotoUrl} alt="Ad" />
                    <ChatInfo>
                        <p>{chat.adAnimal} — {chat.adBreed}</p>
                        <p>Последнее сообщение: {new Date(chat.lastMessageTime).toLocaleString()}</p>
                    </ChatInfo>
                    <ActionButton onClick={() => handleSelectChat(chat.id)}>Открыть</ActionButton>
                </ChatCard>
            ))}
        </ChatListContainer>
    );
};

export default AdminChatList;
