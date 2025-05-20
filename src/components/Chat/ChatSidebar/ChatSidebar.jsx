import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  ChatItem,
  ProfileImage,
  ChatInfo,
  ChatName,
  Title
} from "./ChatSidebarStyle";

const ChatSidebar = ({ chats = [], currentId }) => {
  const navigate = useNavigate();

  return (
    <Sidebar>
      <Title>Чаты</Title>
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
          <ChatInfo>
            <ChatName>{chat.adAnimal} {chat.adBreed}</ChatName>
          </ChatInfo>
        </ChatItem>
      ))}
    </Sidebar>
  );
};

export default ChatSidebar;
