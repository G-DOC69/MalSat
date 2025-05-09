import axios from 'axios';

const base = '/admin'; // base already includes '/api' from default config

const authHeader = (token) => ({
    headers: { Authorization: `Bearer ${token}` }
});

export const getAllUsersAdmin = (token) =>
    axios.get(`${base}/users`, authHeader(token));

export const getAllAdsAdmin = (token) =>
    axios.get(`${base}/ads`, authHeader(token));

export const getUserAdsAdmin = (userId, token) =>
    axios.get(`${base}/user/${userId}/ads`, authHeader(token));

export const getAdOfUserAdmin = (userId, adId, token) =>
    axios.get(`${base}/user/${userId}/ad/${adId}`, authHeader(token));

export const deleteAdAdmin = (adId, token) =>
    axios.delete(`${base}/ad/${adId}`, authHeader(token));

export const getUserChatsAdmin = (userId, token) =>
    axios.get(`${base}/user/${userId}/chats`, authHeader(token));

export const getChatAdmin = (chatId, token) =>
    axios.get(`${base}/chat/${chatId}`, authHeader(token));

export const deleteChatAdmin = (chatId, token) =>
    axios.delete(`${base}/chat/${chatId}`, authHeader(token));

export const disableUserAdmin = (userId, token) =>
    axios.put(`${base}/user/${userId}/disable`, {}, authHeader(token));

export const enableUserAdmin = (userId, token) =>
    axios.put(`${base}/user/${userId}/enable`, {}, authHeader(token));

export const deleteUserAdmin = (userId, token) =>
    axios.delete(`${base}/user/${userId}`, authHeader(token));

export const deleteUserDeliveriesAdmin = (userId, token) =>
    axios.delete(`${base}/user/${userId}/deliveries`, authHeader(token));

// Tariff endpoints
export const getAllTariffsAdmin = (token) =>
    axios.get(`${base}/tariffs`, authHeader(token));

export const updateTariffsAdmin = (token, updatedTariffs) =>
    axios.put(`${base}/tariffs/update`, updatedTariffs, {
        ...authHeader(token),
        headers: {
            ...authHeader(token).headers,
            'Content-Type': 'application/json'
        }
    });
