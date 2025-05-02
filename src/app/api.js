import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/api';

const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

// --- Advertisement related requests ---
export const fetchTopAdsRequest = () => axios.get('/ad/top-ads');

export const getAllAdsRequest = () => axios.get('/ad/all-ads');

export const getFavoriteAdsRequest = (token) => {
    setAuthToken(token);
    return axios.get('/ad/favorites');
};

export const getUserAdsRequest = (token) => {
    setAuthToken(token);
    return axios.get('/ad/my-ads');
};


export const getAdRequest = (id, token) => {
    setAuthToken(token);
    return axios.get(`/ad/${id}`);
};

export const updateAdRequest = (id, token, formData) => {
    setAuthToken(token);
    return axios.put(`/ad/${id}`, formData);
};

export const postAdRequest = (token, formData) => {
    setAuthToken(token);
    return axios.post('/ad/post', formData);
};

export const getAnimalsListRequest = (token) => {
    setAuthToken(token);
    return axios.get('/ad/animals');
};

export const getBreedsbyAnimalsListRequest = (token,animal) => {
    setAuthToken(token);
    return axios.get(`/ad/breeds/${animal}`);
};

export const getAdsByUserIdRequest = (id, token) => {
    setAuthToken(token);
    return axios.get(`/ad/user-ads/${id}`);
};

// --- Notifications ---
export const getUserNotificationsRequest = (token) => {
    setAuthToken(token);
    return axios.get('/notifications/user/notifications');
};

// --- Authentication (login/register/reset) ---
export const loginUserRequest = (formData) => axios.post('/users/login', formData);

export const registerUserRequest = (formData) => axios.post('/users/register', formData);

export const sendPasswordResetRequest = (formData) => axios.post('/users/change-password', formData);

// --- Profile ---
export const updateUserProfileRequest = (token, formData) => {
    setAuthToken(token);
    return axios.put('/users/edit', formData);
};

export const getUserRequest = (token) => {
    setAuthToken(token);
    return axios.get('/users/profile/my');
};

export const getUserByIdRequest = (id, token) => {
    setAuthToken(token);
    return axios.get(`/users/profile/{userId}`);
};

// --- Chat related ---
export const getChatIdRequest = (advertisementId, token) => {
    setAuthToken(token);
    return axios.post('/chats/create', { advertisementId });
};

export const getNewMessagesCountRequest = (token) => {
    setAuthToken(token);
    return axios.get('/user/messages');
};

export const getChatsForUserRequest = async (token) => {
    setAuthToken(token);
    return axios.get('/chats/my-chats');
};

export const getChatByIdRequest = async (chatId, token) => {
    setAuthToken(token);
    return axios.get(`/chats/${chatId}`);
};

export const getAllMessagesRequest = async (chatId, token) => {
    setAuthToken(token);
    return axios.get(`/messages/${chatId}`);
};

export const sendMessageRequest = async (chatId, token, messageText) => {
    setAuthToken(token);
    return axios.post(`/messages/${chatId}`, { text: messageText });
};