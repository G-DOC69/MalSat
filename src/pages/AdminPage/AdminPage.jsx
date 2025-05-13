import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getAllUsersAdmin,
    getAllAdsAdmin
} from '../../app/adminApi.js';

import AdminUserList from './AdminUserList';
import AdminAdList from './AdminAdList';
import AdminAdFullView from './AdminAdFullView';
import AdminChatList from './AdminChatList';
import AdminChatView from './AdminChatView';
import AdminTariffPanel from './AdminTariffPanel';

import {
    Container,
    StartButton,
    ActionButton,
    ErrorText
} from './styles/AdminPageStyle';
import {useSyncUserContext} from "../../hooks/useSyncUserContext.js";

const AdminPage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token');

    const [started, setStarted] = useState(false);
    const [error, ] = useState('');
    const [users, setUsers] = useState([]);

    const [ads, setAds] = useState([]);
    const [chats, setChats] = useState([]);

    const [selectedAd, setSelectedAd] = useState(null);
    const [selectedChat, setSelectedChat] = useState(null);

    const [showAdList, setShowAdList] = useState(false);
    const [showChatList, setShowChatList] = useState(false);

    const [adOwnerId, setAdOwnerId] = useState(null);

    useSyncUserContext()

    const handleStart = async () => {
        try {
            const res = await getAllUsersAdmin(token);
            setUsers(res.data);
            setStarted(true);
        } catch {
            navigate('/');
        }
    };

    const handleFetchAllAds = async () => {
        const res = await getAllAdsAdmin(token);
        setAds(res.data);
        setAdOwnerId(null); // global, not tied to specific user
        setShowAdList(true);
        setShowChatList(false);
        setSelectedAd(null);
        setSelectedChat(null);
    };

    return (
        <Container>
            {!started ? (
                <>
                    <StartButton onClick={handleStart}>Начать админ-панель</StartButton>
                    {error && <ErrorText>{error}</ErrorText>}
                </>
            ) : (
                <>
                    <ActionButton onClick={handleFetchAllAds}>Получить все объявления</ActionButton>

                    {!showAdList && !showChatList && !selectedAd && !selectedChat && (
                        <AdminUserList
                            users={users}
                            token={token}
                            setAds={setAds}
                            setChats={setChats}
                            setAdOwnerId={setAdOwnerId}
                            setShowAdList={setShowAdList}
                            setShowChatList={setShowChatList}
                            setSelectedAd={setSelectedAd}
                            setSelectedChat={setSelectedChat}
                        />
                    )}

                    {showAdList && !showChatList && !selectedChat && (
                        <AdminAdList
                            ads={ads}
                            token={token}
                            userId={adOwnerId}
                            onSelectAd={setSelectedAd}
                            onClearChat={() => setSelectedChat(null)}
                        />
                    )}

                    {showChatList && !showAdList && !selectedAd && (
                        <AdminChatList
                            chats={chats}
                            token={token}
                            onSelectChat={setSelectedChat}
                            onClearAd={() => setSelectedAd(null)}
                        />
                    )}

                    {selectedAd && !selectedChat && (
                        <AdminAdFullView
                            ad={selectedAd}
                            token={token}
                            userId={adOwnerId}
                        />
                    )}

                    {selectedChat && !selectedAd && (
                        <AdminChatView
                            chat={selectedChat}
                            token={token}
                        />
                    )}

                    <AdminTariffPanel token={token} />
                </>
            )}
        </Container>
    );
};

export default AdminPage;
