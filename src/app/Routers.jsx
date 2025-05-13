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
import OperatorPage from "../pages/Operator/OperatorPage.jsx";
import AdminPage from "../pages/AdminPage/AdminPage.jsx";
const Routers = () => (
    <Routes>
            {/* Home & Ads */}
            <Route path="/" element={<HomePage />} />{/*backend-compliant*/}
            <Route path="/ad/:id" element={<OneAdPage />} />{/*backend-compliant*/}
            <Route path="/ad/all-ads" element={<AllAdsPage />} />{/*backend-compliant*/}
            <Route path="/ad/my-ads" element={<UserAdsPage />} />{/*backend-compliant*/}
            <Route path="/ad/favorites" element={<FavoriteAdsPage />} />{/*backend-compliant*/}
            <Route path="/ad/post" element={<PostAdPage />} />{/*backend-compliant*/}
            <Route path="/ad/change/:id" element={<ChangeAdPage />} />{/*backend-compliant*/}
            <Route path="/ad/upgrade/:adId" element={<UpgradePage />} />{/*backend-compliant*/}

            {/* User */}
            <Route path="/user" element={<ProfilePage />} />{/*backend-compliant*/}
            <Route path="/user/:id" element={<ProfilePage />} />{/*backend-compliant*/}
            <Route path="/user/change" element={<ChangeProfilePage />} />{/*backend-compliant*/}
            <Route path="/user/change-password" element={<ChangePasswordPage />} />{/*backend-compliant*/}

            {/* Auth */}
            <Route path="/login/sign-in" element={<LoginPage />} />{/*backend-compliant*/}
            <Route path="/login/register" element={<RegisterPage />} />{/*backend-compliant*/}
            <Route path="/login/confirm-email" element={<EmailSentPage />} />{/*backend-compliant*/}
            <Route path="/login/confirm/:token" element={<ConfirmEmailPage />} />{/*backend-compliant*/}
            <Route path="/login/forgot-password" element={<PasswordResetRequestPage />} />{/*backend-compliant*/}
            <Route path="/reset-password/:token" element={<PasswordResetPage />} />{/*backend-compliant*/}

            {/* Communication */}
            <Route path="/chat" element={<ChatPage />} />{/*backend-compliant*/}
            <Route path="/chat/:chatId" element={<ChatPage />} />{/*backend-compliant*/}
            <Route path="/contact" element={<ContactUsPage />} />{/*backend-compliant*/}

            {/* Delivery */}
            <Route path="/delivery" element={<DeliveryPage />} />{/*backend-compliant*/}
            <Route path="/operator" element={<OperatorPage />} />{/*backend-compliant*/}

            {/*Admin*/}
            <Route path="/admin" element={<AdminPage />} />{/*backend-compliant*/}

            {/* Catch-all */}
            <Route path="*" element={<ErrorPage />} />{/*backend-compliant*/}
    </Routes>
);

export default Routers;
