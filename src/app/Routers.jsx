 import {Route, Routes } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage.jsx';
import AllAdsPage from "../pages/AllAds/AllAdsPage";
import ChangeAdPage from "../pages/ChangeAd/ChangeAdPage";
import EmailSentPage from "../pages/EmailSent/EmailSentPage.jsx";
import LoginPage from "../pages/Login/LoginPage";
import OneAdPage from "../pages/OneAd/OneAdPage";
import PostAdPage from "../pages/PostAd/PostAdPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import RegisterPage from "../pages/register/RegisterPage";
import ForgotPage from "../pages/PasswordResetRequest/PasswordResetRequestPage.jsx";
import ErrorPage from "../pages/ErrorPage";
import ChangeProfilePage from "../pages/ChangeProfile/ChangeProfilePage";
import ChatPage from "../pages/Chat/ChatPage";
import FavoriteAdsPage from "../pages/FavoriteAds/FavoriteAdsPage";
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