import { useNavigate } from "react-router-dom";
import {
    Sidebar,
    ChatItem,
    ProfileImage
} from "./ChatSidebarStyle";

const ChatSidebar = ({ chats = [], currentId }) => {
    const navigate = useNavigate();

    return (
        <Sidebar>
            <h3>Чаты</h3>
            {chats.map(chat => (
                <ChatItem
                    key={chat.id}
                    selected={String(currentId) === String(chat.id)}
                    onClick={() => {
                        if (String(currentId) !== String(chat.id)) {
                            navigate(`/chat/${chat.id}`);
                        }
                    }}
                >
                    <ProfileImage src={chat.adPhotoUrl} alt="Ad" />
                    <div>
                        <p><strong>{chat.adAnimal} {chat.adBreed}</strong></p>
                    </div>
                </ChatItem>
            ))}
        </Sidebar>
    );
};

export default ChatSidebar;
