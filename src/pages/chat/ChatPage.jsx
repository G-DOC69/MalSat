import React from 'react';
import './ChatPageStyle.css'
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {useCheckUser} from "../../hooks/useCheckUser.js";
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

    useCheckUser()

    useEffect(() => {
        fetchChats();
    }, []);

    useEffect(() => {
        if (chatId) {
            setSelectedChat(chatId);
        }
    }, [chatId]);

    useEffect(()=>{
        if (selectedChat) {
            fetchMessages(chatId);
        }
    },[selectedChat]);

    const fetchChats = () => {
        const dummyChats = [
            {
                id: "1",
                user: { name: "User1", profilePic: "https://example.com/user1.jpg", id: "101" },
                ad: { animal: "Корова", breed: "Ангус", price: 40000, id: "201" },
            },
            {
                id: "2",
                user: { name: "User2", profilePic: "https://example.com/user2.jpg", id: "102" },
                ad: { animal: "Лошадь", breed: "Арабская", price: 70000, id: "202" },
            },
        ];
        setChats(dummyChats);
    };

    const fetchMessages = (id) => {
        console.log(id)
        const dummyMessages = [
            { id: 1, text: "Hello!", sender: "me" },
            { id: 2, text: "Hi there!", sender: "them" },
        ];
        setMessages(dummyMessages);
    };

    const sendMessage = () => {
        if (!newMessage.trim() || newMessage.length > 300) return;
        setMessages([...messages, { id: Date.now(), text: newMessage, sender: "me" }]);
        setNewMessage("");
        setMessageLimitExceeded(false);
    };

    const handleMessageChange = (e) => {
        const text = e.target.value;
        if (text.length <= 300) {
            setNewMessage(text);
            setMessageLimitExceeded(text.length > 200);
        }
    };

    const selectedChatData = chats.find((c) => c.id === selectedChat);

    return (
        <ChatContainer>
            {/* Sidebar с чатами */}
            <Sidebar>
                <h3>Чаты</h3>
                {chats.map((chat) => (
                    <ChatItem key={chat.id} selected={selectedChat === chat.id} onClick={() => {
                        if (selectedChat !== chat.id) {
                            navigate(`/chat/${chat.id}`);
                            setSelectedChat(chat.id);
                        }
                    }}>
                        <ProfileImage src={chat.user.profilePic} alt={chat.user.name} />
                        <div>
                            <p><strong>{chat.user.name}</strong></p>
                            <p style={{ fontSize: "12px", color: "#555" }}>
                                {chat.ad.animal} {chat.ad.breed} - {chat.ad.price} сом
                            </p>
                        </div>
                    </ChatItem>
                ))}
            </Sidebar>

            {/* Окно чата */}
            <ChatMain>
                {selectedChatData ? (
                    <>
                        {/* Заголовок чата */}
                        <ChatHeader>
                            <ProfileImage src={selectedChatData.user.profilePic} alt={selectedChatData.user.name} />
                            <h3>
                                <a href={`/profile/${selectedChatData.user.id}`} style={{ textDecoration: "none", color: "black" }}>
                                    Чат с {selectedChatData.user.name}
                                </a>
                            </h3>
                        </ChatHeader>

                        {/* Сообщения */}
                        <ChatMessages>
                            {messages.map((msg) => (
                                <Message key={msg.id} sender={msg.sender}>
                                    {msg.text}
                                </Message>
                            ))}
                        </ChatMessages>

                        {/* Поле ввода */}
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

                        {/* Ошибки */}
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
