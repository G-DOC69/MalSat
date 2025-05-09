import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    getUserChatsRequest,
    getChatDetailsRequest,
    getUnreadMessagesRequest,
    sendMessageRequest
} from "../../app/api";
import { useCheckUser } from "../../hooks/useCheckUser";
import { ChatContainer } from "./ChatPageStyle";

import ChatSidebar from "../../components/chat/ChatSidebar/ChatSidebar";
import ChatHeader from "../../components/chat/ChatHeader/ChatHeader";
import ChatMessages from "../../components/chat/ChatMessages/ChatMessages";
import ChatInputBar from "../../components/chat/ChatInputBar/ChatInputBar";
import EmptyChatPlaceholder from "../../components/chat/EmptyChatPlaceholder/EmptyChatPlaceholder";

const ChatPage = () => {
    const { chatId } = useParams();
    const token = localStorage.getItem("access_token");

    const [chats, setChats] = useState([]);
    const [chatData, setChatData] = useState(null); // ChatSingularResponse
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useCheckUser();

    useEffect(() => {
        fetchChats();
    }, []);

    useEffect(() => {
        if (chatId) {
            fetchFullChat(chatId);
        } else {
            setChatData(null);
            setMessages([]);
        }
    }, [chatId]);

    const fetchChats = async () => {
        try {
            const res = await getUserChatsRequest(token);
            setChats(res.data);
        } catch (err) {
            console.error("Ошибка загрузки чатов:", err);
        }
    };

    const fetchFullChat = async (id) => {
        try {
            const res = await getChatDetailsRequest(id, token);
            setChatData(res.data);
            setMessages(res.data.messages || []);
        } catch (err) {
            console.error("Ошибка загрузки чата:", err);
        }
    };

    const fetchUnread = async () => {
        if (!chatId) return;
        try {
            const res = await getUnreadMessagesRequest(chatId, token);
            setMessages(prev => [...prev, ...res.data]);
        } catch (err) {
            console.error("Ошибка загрузки новых сообщений:", err);
        }
    };

    const sendMessage = async () => {
        if (!newMessage.trim() || newMessage.length > 300) return;
        try {
            await fetchUnread(); // append new messages before sending
            await sendMessageRequest(chatId, token, newMessage);
            setMessages(prev => [...prev, {
                text: newMessage,
                isMine: true,
                isRead: false,
                sentAt: new Date().toISOString()
            }]);
            setNewMessage("");
        } catch (err) {
            console.error("Ошибка отправки сообщения:", err);
        }
    };

    return (
        <ChatContainer>
            <ChatSidebar chats={chats} currentId={chatId} />
            {chatData ? (
                <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
                    <ChatHeader
                        adId={chatData.adId}
                        adPhotoUrl={chatData.adPhotoUrl}
                        adAnimal={chatData.adAnimal}
                        adBreed={chatData.adBreed}
                        otherUser={chatData.otherUser}
                        onRefresh={fetchUnread}
                    />
                    <ChatMessages messages={messages} />
                    <ChatInputBar
                        value={newMessage}
                        setValue={setNewMessage}
                        onSend={sendMessage}
                    />
                </div>
            ) : (
                <EmptyChatPlaceholder />
            )}
        </ChatContainer>
    );
};

export default ChatPage;
