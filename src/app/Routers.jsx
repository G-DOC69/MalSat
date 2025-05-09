import { Route, Routes } from 'react-router-dom';

// Core pages
import HomePage from '../pages/Home/HomePage.jsx';
import AllAdsPage from "../pages/AllAds/AllAdsPage.jsx";
import OneAdPage from "../pages/OneAd/OneAdPage.jsx";
import PostAdPage from "../pages/PostAd/PostAdPage.jsx";
import ChangeAdPage from "../pages/ChangeAd/ChangeAdPage.jsx";

// User profile and ads
import ProfilePage from "../pages/Profile/ProfilePage.jsx";
import ChangeProfilePage from "../pages/ChangeProfile/ChangeProfilePage.jsx";
import UserAdsPage from "../pages/UserAds/UserAdsPage.jsx";
import FavoriteAdsPage from "../pages/FavoriteAds/FavoriteAdsPage.jsx";

// Auth & login
import LoginPage from "../pages/Login/LoginPage.jsx";
import RegisterPage from "../pages/Register/RegisterPage.jsx";
import EmailSentPage from "../pages/EmailSent/EmailSentPage.jsx";
import ConfirmEmailPage from "../pages/ConfirmEmail/ConfirmEmailPage.jsx";
import PasswordResetPage from "../pages/PasswordReset/PasswordResetPage.jsx";
import PasswordResetRequestPage from "../pages/PasswordResetRequest/PasswordResetRequestPage.jsx";
import ChangePasswordPage from "../pages/ChangePassword/ChangePasswordPage.jsx";

// Other functionality
import ChatPage from "../pages/Chat/ChatPage.jsx";
import ContactUsPage from "../pages/ContactUs/ContactUsPage.jsx";
import DeliveryPage from "../pages/Delivery/DeliveryPage.jsx";
import UpgradePage from "../pages/Upgrade/UpgradePage.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
const Routers = () => (
    <Routes>
            {/* Home & Ads */}
            <Route path="/" element={<HomePage />} />
            <Route path="/ad/:id" element={<OneAdPage />} />
            <Route path="/ad/all-ads" element={<AllAdsPage />} />
            <Route path="/ad/my-ads" element={<UserAdsPage />} />
            <Route path="/ad/favorites" element={<FavoriteAdsPage />} />
            <Route path="/ad/post" element={<PostAdPage />} />
            <Route path="/ad/change/:id" element={<ChangeAdPage />} />
            <Route path="/ad/upgrade/:adId" element={<UpgradePage />} />

            {/* User */}
            <Route path="/user" element={<ProfilePage />} />
            <Route path="/user/:id" element={<ProfilePage />} />
            <Route path="/user/change" element={<ChangeProfilePage />} />
            <Route path="/user/change-password" element={<ChangePasswordPage />} />

            {/* Auth */}
            <Route path="/login/sign-in" element={<LoginPage />} />
            <Route path="/login/register" element={<RegisterPage />} />
            <Route path="/login/confirm-email" element={<EmailSentPage />} />
            <Route path="/login/confirm/:token" element={<ConfirmEmailPage />} />
            <Route path="/login/forgot-password" element={<PasswordResetRequestPage />} />
            <Route path="/reset-password/:token" element={<PasswordResetPage />} />

            {/* Communication */}
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/chat/:id" element={<ChatPage />} />
            <Route path="/contact" element={<ContactUsPage />} />

            {/* Delivery */}
            <Route path="/delivery" element={<DeliveryPage />} />

            {/* Catch-all */}
            <Route path="*" element={<ErrorPage />} />
    </Routes>
);

export default Routers;
