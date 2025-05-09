import {
    getUserAdsAdmin,
    getUserChatsAdmin,
    disableUserAdmin,
    enableUserAdmin,
    deleteUserAdmin,
    deleteUserDeliveriesAdmin
} from '../../app/adminApi.js';

import {
    PanelContainer,
    ActionButton,
    PanelSection,
    PanelLabel,
    Divider
} from './styles/AdminUserPanelStyle';

const AdminUserPanel = ({
                            user,
                            token,
                            setAds,
                            setChats,
                            setAdOwnerId,
                            setShowAdList,
                            setShowChatList,
                            setSelectedAd,
                            setSelectedChat
                        }) => {

    const handleFetchAds = async () => {
        const res = await getUserAdsAdmin(user.id, token);
        setAds(res.data);
        setAdOwnerId(user.id);
        setShowAdList(true);
        setShowChatList(false);
        setSelectedAd(null);
        setSelectedChat(null);
    };

    const handleFetchChats = async () => {
        const res = await getUserChatsAdmin(user.id, token);
        setChats(res.data);
        setShowChatList(true);
        setShowAdList(false);
        setSelectedAd(null);
        setSelectedChat(null);
    };

    const handleDisable = async () => {
        await disableUserAdmin(user.id, token);
    };

    const handleEnable = async () => {
        await enableUserAdmin(user.id, token);
    };

    const handleDeleteUser = async () => {
        await deleteUserAdmin(user.id, token);
    };

    const handleDeleteDeliveries = async () => {
        await deleteUserDeliveriesAdmin(user.id, token);
    };

    return (
        <PanelContainer>
            <PanelSection>
                <PanelLabel>Действия</PanelLabel>
                <ActionButton onClick={handleFetchAds}>Получить объявления</ActionButton>
                <ActionButton onClick={handleFetchChats}>Получить чаты</ActionButton>
                <ActionButton onClick={handleDeleteDeliveries}>Удалить все доставки</ActionButton>
                {user.enabled ? (
                    <ActionButton onClick={handleDisable}>Отключить пользователя</ActionButton>
                ) : (
                    <ActionButton onClick={handleEnable}>Включить пользователя</ActionButton>
                )}
                <ActionButton onClick={handleDeleteUser}>Удалить пользователя</ActionButton>
            </PanelSection>
            <Divider />
        </PanelContainer>
    );
};

export default AdminUserPanel;
