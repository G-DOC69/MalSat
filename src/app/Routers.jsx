import {Route, Routes } from 'react-router-dom';
import HomePage from '../pages/home/HomePage.jsx';
import AllAdsPage from "../pages/allads/AllAdsPage";
import ChangeAdPage from "../pages/changead/ChangeAdPage";
import EmailSentPage from "../pages/email/EmailSentPage.jsx";
import LoginPage from "../pages/login/LoginPage";
import OneAdPage from "../pages/onead/OneAdPage";
import PostAdPage from "../pages/postad/PostAdPage";
import ProfilePage from "../pages/profile/ProfilePage";
import RegisterPage from "../pages/register/RegisterPage";
import ForgotPage from "../pages/forgot/ForgotPage";
import ErrorPage from "../pages/ErrorPage";
import ChangeProfilePage from "../pages/changeprofile/ChangeProfilePage";
import ChatPage from "../pages/chat/ChatPage";
import FavoriteAdsPage from "../pages/favoriteads/FavoriteAdsPage";
import UserAdsPage from "../pages/userads/UserAdsPage";

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ad/:id" element={<OneAdPage />} />
            <Route path="/ad/all-ads" element={<AllAdsPage />} />
            <Route path="/ad/my-ads" element={<UserAdsPage />} />
            <Route path="/ad/favorites" element={<FavoriteAdsPage />} />
            <Route path="/ad/post" element={<PostAdPage />} />
            <Route path="/ad/change/:id" element={<ChangeAdPage />} />
            <Route path="/login/sign-in" element={<LoginPage />} />
            <Route path="/login/register" element={<RegisterPage />} />
            <Route path="/login/confirm-email" element={<EmailSentPage />} />
            <Route path="/login/forgot-password" element={<ForgotPage />} />
            <Route path="/user/" element={<ProfilePage />} />
            <Route path="/user/:id" element={<ProfilePage />} />
            <Route path="/user/change" element={<ChangeProfilePage />} />
            <Route path="/chat/" element={<ChatPage />} />
            <Route path="/chat/:id" element={<ChatPage />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}

export default Routers