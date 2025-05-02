import './ChatPageStyle.css'
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    getAllMessagesRequest,
    getChatsForUserRequest,
    sendMessageRequest
} from "../../app/api";
import { useCheckUser } from "../../hooks/useCheckUser";
import styled from "styled-components";


const ChatContainer = styled.div`
display: flex;
height: 80vh;
max-width: 1200px;
margin: auto 0;
border: 1px solid #ccc;
border-radius: 10px;
overflow: hidden;
background: white;
`;

const Sidebar = styled.div`
width: fit-content;
border-right: 1px solid #ddd;
padding: 10px;
overflow-y: auto;
display: flex;
flex-direction: column;
background: #f8fafc;
gap: 5px;
`;

const ChatItem = styled.div`
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

const ProfileImage = styled.img`
width: 40px;
height: 40px;
border-radius: 50%;
margin-right: 10px;
`;

const ChatMain = styled.div`
width: 70%;
display: flex;
flex-direction: column;
padding: 10px;
`;

const ChatHeader = styled.div`
display: flex;
align-items: center;
padding-bottom: 10px;
border-bottom: 1px solid #ddd;
`;

const ChatMessages = styled.div`
flex: 1;
overflow-y: auto;
padding: 10px;
display: flex;
flex-direction: column;
`;

const Message = styled.div`
max-width: 70%;
padding: 8px 12px;
border-radius: 15px;
margin-bottom: 8px;
align-self: ${({ sender }) => (sender === "me" ? "flex-end" : "flex-start")};
background: ${({ sender }) => (sender === "me" ? "#3b82f6" : "#e2e8f0")};
color: ${({ sender }) => (sender === "me" ? "white" : "black")};
`;

const ChatInputContainer = styled.div`
display: flex;
align-items: center;
padding: 10px;
border-top: 1px solid #ddd;
background: #f8fafc;
`;

const ChatInput = styled.input`
flex: 1;
padding: 10px;
border: 1px solid #ccc;
border-radius: 5px;
font-size: 14px;
`;

const SendButton = styled.button`
background: #1e3a8a;
color: white;
border: none;
padding: 10px 15px;
border-radius: 8px;
font-size: 14px;
margin-left: 10px;
cursor: pointer;
transition: background 0.3s;

&:disabled {
    background: #94a3b8;
    cursor: not-allowed;
}

&:hover:not(:disabled) {
    background: #3b82f6;
}
`;

const ChatPage = () => {
    const { chatId } = useParams();
    const navigate = useNavigate();
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [messageLimitExceeded, setMessageLimitExceeded] = useState(false);

    const token = localStorage.getItem("access_token");
    useCheckUser();

    useEffect(() => {
        fetchChats();
    }, []);

    useEffect(() => {
        if (chatId) {
            setSelectedChat(chatId);
            fetchMessages(chatId);
        }
    }, [chatId]);

    const fetchChats = async () => {
        try {
            const res = await getChatsForUserRequest(token);
            setChats(res.data);
        } catch (err) {
            console.error("Ошибка загрузки чатов:", err);
        }
    };

    const fetchMessages = async (id) => {
        try {
            const res = await getAllMessagesRequest(id, token);
            setMessages(res.data);
        } catch (err) {
            console.error("Ошибка загрузки сообщений:", err);
        }
    };

    const sendMessage = async () => {
        if (!newMessage.trim() || newMessage.length > 300) return;
        try {
            await sendMessageRequest(selectedChat, token, newMessage);
            await fetchMessages(selectedChat); // перезагрузка сообщений
            setNewMessage("");
            setMessageLimitExceeded(false);
        } catch (err) {
            console.error("Ошибка отправки сообщения:", err);
        }
    };

    const handleMessageChange = (e) => {
        const text = e.target.value;
        if (text.length <= 300) {
            setNewMessage(text);
            setMessageLimitExceeded(text.length > 200);
        }
    };

    const selectedChatData = chats.find(c => c.id == selectedChat); // == на случай string/number

    return (
        <ChatContainer>
            {/* Sidebar с чатами */}
            <Sidebar>
                <h3>Чаты</h3>
                {chats.map(chat => (
                    <ChatItem key={chat.id} selected={selectedChat == chat.id} onClick={() => {
                        if (selectedChat != chat.id) {
                            navigate(`/chat/${chat.id}`);
                        }
                    }}>
                        <ProfileImage src={chat.adPhotoUrl} alt="Ad photo" />
                        <div>
                            <p><strong>{chat.adAnimal} {chat.adBreed}</strong></p>
                        </div>
                    </ChatItem>
                ))}
            </Sidebar>

            {/* Окно чата */}
            <ChatMain>
                {selectedChatData ? (
                    <>
                        <ChatHeader>
                            <ProfileImage src={selectedChatData.adPhotoUrl} alt="Ad" />
                            <h3>{selectedChatData.adAnimal} {selectedChatData.adBreed}</h3>
                        </ChatHeader>

                        <ChatMessages>
                            {messages.map((msg, index) => (
                                <Message key={index} sender={msg.isMine ? "me" : "them"}>
                                    {msg.text}
                                </Message>
                            ))}
                        </ChatMessages>

                        <ChatInputContainer>
                            <ChatInput
                                type="text"
                                value={newMessage}
                                onChange={handleMessageChange}
                                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                maxLength={300}
                            />
                            <SendButton onClick={sendMessage} disabled={!newMessage.trim()}>Отправить</SendButton>
                        </ChatInputContainer>

                        {messageLimitExceeded && <p style={{ color: "red", textAlign: "center" }}>Максимум 300 символов, осталось {300 - newMessage.length}</p>}
                        {newMessage.length === 300 && <p style={{ color: "red", textAlign: "center" }}>Укоротите сообщение</p>}
                    </>
                ) : (
                    <p style={{ textAlign: "center", marginTop: "20px" }}>Выберите чат</p>
                )}
            </ChatMain>
        </ChatContainer>
    );
};

export default ChatPage;
