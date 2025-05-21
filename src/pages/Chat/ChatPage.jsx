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

import ChatSidebar from "../../components/Chat/ChatSidebar/ChatSidebar";
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
    const [loading,setLoading]=useState(false);

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
            const code = err.response?.status;
            if (code === 401) {
                localStorage.removeItem("access_token");
                window.location.href = "/";
                return;
            }

            switch (code) {
                case 403:
                    console.error("Доступ к чатам запрещён.");
                    break;
                case 500:
                    console.error("Ошибка сервера при загрузке чатов.");
                    break;
                default:
                    console.error("Ошибка загрузки чатов:", err.response?.data?.message || err.message);
            }
        }
    };

    const fetchFullChat = async (id) => {
        try {
            const res = await getChatDetailsRequest(id, token);
            setChatData(res.data);
            setMessages(res.data.messages || []);
        } catch (err) {
            const code = err.response?.status;
            if (code === 401) {
                localStorage.removeItem("access_token");
                window.location.href = "/";
                return;
            }

            switch (code) {
                case 403:
                    console.error("Нет доступа к выбранному чату.");
                    break;
                case 404:
                    console.error("Чат не найден.");
                    break;
                case 500:
                    console.error("Ошибка сервера при загрузке чата.");
                    break;
                default:
                    console.error("Ошибка загрузки чата:", err.response?.data?.message || err.message);
            }
        }
    };

    const fetchUnread = async () => {
        if (!chatId) return;
        try {
            const res = await getUnreadMessagesRequest(chatId, token);
            setMessages(prev => [...prev, ...res.data]);
        } catch (err) {
            const code = err.response?.status;
            if (code === 401) {
                localStorage.removeItem("access_token");
                window.location.href = "/";
                return;
            }

            switch (code) {
                case 403:
                    console.error("Нет доступа к чату.");
                    break;
                case 404:
                    console.error("Чат не найден.");
                    break;
                case 500:
                    console.error("Ошибка сервера при получении новых сообщений.");
                    break;
                default:
                    console.error("Ошибка при получении сообщений:", err.response?.data?.message || err.message);
            }
        }
    };

    const sendMessage = async () => {
        if (!newMessage.trim() || newMessage.length > 300) return;
        try {
            setLoading(true);
            await fetchUnread(); // best-effort, its own catch handles errors
            await sendMessageRequest(chatId, token, newMessage);
            setMessages(prev => [...prev, {
                text: newMessage,
                mine: true,
                isRead: false,
                sentAt: new Date().toISOString()
            }]);
            setNewMessage("");
        } catch (err) {
            const code = err.response?.status;
            if (code === 401) {
                localStorage.removeItem("access_token");
                window.location.href = "/";
                return;
            }

            switch (code) {
                case 400:
                    console.error("Недопустимое сообщение.");
                    break;
                case 403:
                    console.error("Вы не можете отправлять сообщения в этот чат.");
                    break;
                case 404:
                    console.error("Чат не найден.");
                    break;
                case 500:
                    console.error("Ошибка сервера при отправке сообщения.");
                    break;
                default:
                    console.error("Ошибка отправки сообщения:", err.response?.data?.message || err.message);
            }
        } finally {
            setLoading(false);
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
                        loading={loading}
                    />
                </div>
            ) : (
                <EmptyChatPlaceholder />
            )}
        </ChatContainer>
    );
};

export default ChatPage;
