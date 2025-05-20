import { useState } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInputBar from "./ChatInputBar";
import styled from "styled-components";

const ChatLayoutContainer = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 64px); /* с учётом Topbar */
  margin-top: 64px;
`;

const ChatMain = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ChatPage = ({ chats = [], currentChat }) => {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim()) return;
    // логика отправки сообщения
    setValue("");
  };

  return (
    <ChatLayoutContainer>
      <ChatSidebar chats={chats} currentId={currentChat?.id} />
      <ChatMain>
        {currentChat ? (
          <>
            <ChatHeader
              adId={currentChat.adId}
              adPhotoUrl={currentChat.adPhotoUrl}
              adAnimal={currentChat.adAnimal}
              adBreed={currentChat.adBreed}
              otherUser={currentChat.otherUser}
              onRefresh={() => {}}
            />
            <ChatMessages messages={currentChat.messages} />
            <ChatInputBar value={value} setValue={setValue} onSend={handleSend} />
          </>
        ) : (
          <div style={{ padding: "32px", color: "#94a3b8" }}>Выберите чат</div>
        )}
      </ChatMain>
    </ChatLayoutContainer>
  );
};

export default ChatPage;
