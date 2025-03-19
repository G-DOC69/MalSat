import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/api';

const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};


// ad related requests
export const fetchTopAdsRequest = async () => {
    return axios.get('/ad/top-ads');
}
export const getAllAdsRequest = async () => {
    return axios.get('/ad/all-ads');
}
export const getFavoriteAdsRequest = async (token) => {
    setAuthToken(token);
    return axios.get('/ad/favorite-ads');
}
export const getUserAdsRequest = async (token) => {
    setAuthToken(token);
    return axios.get('/ad/user-ads/my-ads');
}
export const getAdRequest = async (id,token) => {
    setAuthToken(token);
    return axios.get(`/ad/${id}`);
}
export const updateAdRequest = async (id,token,formData) => {
    setAuthToken(token);
    return axios.put(`/ad/change/${id}`, formData);
}
export const postAdRequest = async (token,formData) => {
    setAuthToken(token);
    return axios.post(`/ad/post`, formData);
}
export const getAnimalsListRequest = async (token) => {
    setAuthToken(token);
    return axios.get(`/ad/animals-list`);
}
export const getAdsByUserId = async (id,token) =>{
    setAuthToken(token)
    return axios.get(`/ad/user-ads/${id}`);
}


//other get requests


export const getUserNotificationsRequest = async (token) => {
    setAuthToken(token);
    return axios.get(`/notifications/user/notifications`);
}


//login related requests
export const loginUserRequest = async (formData)=>{
    return axios.post(`/users/login/sign-in`, formData);
}
export const registerUserRequest = async (formData) => {
    return axios.post(`/users/login/register`, formData);
}
export const sendPasswordResetRequest = async (formData)=>{
    return axios.post(`/users/login/change-password`, formData);
}


//profile related requests
export const updateUserProfileRequest = async (token, formData) => {
    setAuthToken(token);
    return axios.put(`/user/change`, formData);
}
export const getUserRequest = async (token)=>{
    setAuthToken(token);
    return axios.get('/users/user/profile/my-profile')
}
export const getUserByIdRequest = async (id,token)=>{
    setAuthToken(token);
    return axios.get(`/users/user/profile/${id}`);
}


//chat related requests (in progress)
export const getChatIdRequest = async (id,token)=>{
    setAuthToken(token);
    return axios.post(`/chats/chat/create/${id}`);
}
export const getChatByIdRequest = async (id,token)=>{
    setAuthToken(token);
    return axios.get(`/chats/chat/get-chat/${id}`);
}
export const getNewMessagesCountRequest = async (token) => {
    setAuthToken(token);
    return axios.get(`/user/messages`);
}