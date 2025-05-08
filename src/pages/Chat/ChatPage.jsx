import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    getChatsForUserRequest,
    getChatByIdRequest,
    getUnreadMessagesRequest,
    sendMessageRequest
} from "../../app/api";
import { useCheckUser } from "../../hooks/useCheckUser";

import ChatSidebar from "../../components/chat/ChatSidebar/ChatSidebar";
import ChatHeader from "../../components/chat/ChatHeader/ChatHeader";
import ChatMessages from "../../components/chat/ChatMessages/ChatMessages";
import ChatInputBar from "../../components/chat/ChatInputBar/ChatInputBar";
import EmptyChatPlaceholder from "../../components/chat/EmptyChatPlaceholder/EmptyChatPlaceholder";

const ChatPage = () => {
    const { chatId } = useParams();
    const token = localStorage.getItem("access_token");

    const [chats, setChats] = useState([]);
    const [chatData, setChatData] = useState(null);
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
            const res = await getChatsForUserRequest(token);
            setChats(res.data);
        } catch (err) {
            console.error("Ошибка загрузки чатов:", err);
        }
    };

    const fetchFullChat = async (id) => {
        try {
            const res = await getChatByIdRequest(id, token);
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
            await fetchUnread();
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
        <div className="flex h-[calc(100vh-4rem)] pt-16 overflow-hidden">
            <div className="w-[300px] border-r border-gray-200 bg-white overflow-y-auto">
                <ChatSidebar chats={chats} currentId={chatId} />
            </div>

            <div className="flex-1 flex flex-col">
                {chatData ? (
                    <>
                        <ChatHeader
                            adId={chatData.adId}
                            adPhotoUrl={chatData.adPhotoUrl}
                            adAnimal={chatData.adAnimal}
                            adBreed={chatData.adBreed}
                            otherUser={chatData.otherUser}
                            onRefresh={fetchUnread}
                        />
                        <div className="flex-1 overflow-y-auto bg-gray-50">
                            <ChatMessages messages={messages} />
                        </div>
                        <div className="border-t border-gray-300 bg-white px-4 py-3">
                            <ChatInputBar
                                value={newMessage}
                                setValue={setNewMessage}
                                onSend={sendMessage}
                            />
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center bg-gray-100">
                        <EmptyChatPlaceholder />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatPage;
