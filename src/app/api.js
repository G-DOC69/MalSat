// api.js
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/api';

const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

// --- AdvertisementController ---
export const fetchTopAdsRequest = (signal) => axios.get('/ad/top-ads',{signal});
export const getAllAdsRequest = (signal) => axios.get('/ad/all-ads', { signal });
export const getUserAdsRequest = (token,signal) => {
    setAuthToken(token);
    return axios.get('/ad/my-ads',{signal});
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
export const deleteAdRequest = (id, token) => {
    setAuthToken(token);
    return axios.delete(`/ad/${id}`);
};
export const getAdsByUserIdRequest = (id, token) => {
    setAuthToken(token);
    return axios.get(`/ad/user-ads/${id}`);
};

// --- NotificationsController ---
export const getUserNotificationsRequest = (token) => {
    setAuthToken(token);
    return axios.get('/notifications/user/notifications');
};

// --- AuthController ---
export const loginUserRequest = (formData) => axios.post('/users/login', formData);
export const registerUserRequest = (formData) => axios.post('/users/register', formData);
export const confirmEmailRequest = (token) => axios.get(`/users/confirm-email/${token}`);
export const requestPasswordReset = (email) => axios.post(`/users/request-password-reset?email=${email}`);
export const resetPassword = (token, newPassword) => axios.put(`/users/reset-password?token=${token}&newPassword=${newPassword}`);
export const changePassword = (token, oldPassword, newPassword) => {
    setAuthToken(token);
    return axios.put(`/users/change-password?oldPassword=${oldPassword}&newPassword=${newPassword}`);
};

// --- ProfileController ---
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
    return axios.get(`/users/profile/${id}`);
};
export const getUserEditFormRequest = (token) => {
    setAuthToken(token);
    return axios.get('/users/edit-form');
};

// --- ChatController ---
export const createChatRequest = (token, adId) => {
    setAuthToken(token);
    return axios.post(`/chats/create/?id=${adId}`);
};
export const getUserChatsRequest = (token) => {
    setAuthToken(token);
    return axios.get('/chats/my-chats');
};
export const getChatDetailsRequest = (chatId, token) => {
    setAuthToken(token);
    return axios.get(`/chats/${chatId}`);
};

// --- MessagesController ---
export const sendMessageRequest = (chatId, token, messageText) => {
    setAuthToken(token);
    return axios.post(`/messages/${chatId}`, { text: messageText });
};
export const getUnreadMessagesRequest = (chatId, token) => {
    setAuthToken(token);
    return axios.get(`/messages/${chatId}/unread`);
};

// --- DeliveryController ---
export const getDeliveriesRequestedBy = (token) => {
    setAuthToken(token);
    return axios.get('/delivery/requested-by');
};
export const getDeliveriesRequestedFrom = (token) => {
    setAuthToken(token);
    return axios.get('/delivery/requested-from');
};
export const createDeliveryRequest = (token, payload) => {
    setAuthToken(token);
    return axios.post('/delivery/create', payload);
};
export const denyDeliveryRequest = (token, deliveryId) => {
    setAuthToken(token);
    return axios.post(`/delivery/deny?deliveryId=${deliveryId}`);
};
export const confirmDeliveryRequest = (token, payload) => {
    setAuthToken(token);
    return axios.post('/delivery/confirm', payload);
};

// --- DeliveryOperatorController ---
export const getAllDeliveriesForOperator = (token) => {
    setAuthToken(token);
    return axios.get('/operator/deliveries');
};
export const updateDeliveryStatusByOperator = (token, deliveryId, status) => {
    setAuthToken(token);
    return axios.post(`/operator/deliveries/update-status?deliveryId=${deliveryId}&status=${status}`);
};

// --- FavoriteController ---
export const addFavoriteRequest = (adId, token) => {
    setAuthToken(token);
    return axios.post(`/favorites/add/${adId}`);
};
export const removeFavoriteRequest = (adId, token) => {
    setAuthToken(token);
    return axios.delete(`/favorites/${adId}`);
};
export const checkFavoriteRequest = (adId, token) => {
    setAuthToken(token);
    return axios.get(`/favorites/check/${adId}`);
};
export const getFavoritesRequest = (token,signal) => {
    setAuthToken(token);
    return axios.get('/favorites',{signal});
};

// --- PaymentReceiptAdminController ---
export const getAllReceiptsForOperator = (token) => {
    setAuthToken(token);
    return axios.get('/operator/receipts');
};
export const confirmReceiptByOperator = (token,receiptId ) => {
    setAuthToken(token);
    return axios.post(`/operator/receipts/confirm?receiptId=${receiptId}`);
};
export const rejectReceiptByOperator = (token,receiptId ) => {
    setAuthToken(token);
    return axios.post(`/operator/receipts/reject?receiptId=${receiptId}`);
};

// --- PaymentReceiptController ---
export const checkUpgradeEligibility = (adId, token) => {
    setAuthToken(token);
    return axios.get(`/payment/check-upgrade-eligibility?adId=${adId}`);
};
export const uploadUpgradeReceipt = (token, formData) => {
    setAuthToken(token);
    return axios.post('/payment/upload-receipt', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

// --- PublicController ---
export const sendContactUsRequest = async (data) => {
    return await axios.post('/public/contact', data);
};
