import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { getUserByIdRequest, getUserRequest } from "../../app/api";
import { useCheckUser } from "../../hooks/useCheckUser";
import {
    ProfileContainer,
    AdsTitle,
    AdsContainer,
    LoadMoreButton
} from "./ProfilePageStyle";
import AdCard from "../../components/AdCard/AdCard";
import ProfileHeaderBlock from "../../components/ProfileHeaderBlock/ProfileHeaderBlock";

const ProfilePage = () => {
    const { id } = useParams();
    const [user] = useContext(UserContext);
    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [ads, setAds] = useState([]);
    const [allAds, setAllAds] = useState([]);
    const [hasMoreAds, setHasMoreAds] = useState(false);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("access_token");

    useCheckUser();

    useEffect(() => {
        setLoading(true);
        if (id) {
            fetchProfile(id);
        } else {
            fetchOwnProfile();
        }
    }, [id, user]);

    const fetchProfile = async (targetId) => {
        try {
            const res = await getUserByIdRequest(targetId, token);
            const profileData = res.data;
            setProfile(profileData);

            const allUserAds = profileData.advertisements || [];
            setAllAds(allUserAds);
            setAds(allUserAds.slice(0, 10));
            setHasMoreAds(allUserAds.length > 10);
        } catch (err) {
            console.error("Ошибка загрузки профиля:", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchOwnProfile = async () => {
        try {
            const res = await getUserRequest(token);
            const profileData = res.data;
            setProfile(profileData);

            const ownAds = profileData.advertisements || [];
            setAllAds(ownAds);
            setAds(ownAds.slice(0, 10));
            setHasMoreAds(ownAds.length > 10);
        } catch (err) {
            console.error("Ошибка загрузки собственного профиля:", err);
        } finally {
            setLoading(false);
        }
    };

    const restoreAllAds = () => {
        setAds(allAds);
        setHasMoreAds(false);
    };

    if (loading) return <p style={{ textAlign: "center" }}>Загрузка...</p>;

    return (
        <ProfileContainer>
            <ProfileHeaderBlock
                username={profile.username}
                phone={profile.phone}
                photoUrl={profile.photoUrl}
                isOwn={!id}
                onEdit={() => navigate("/user/change")}
            />

            {ads.length > 0 && <AdsTitle>Объявления пользователя</AdsTitle>}
            <AdsContainer>
                {ads.map(ad => (
                    <AdCard key={ad.id} ad={ad} />
                ))}
            </AdsContainer>

            {hasMoreAds && (
                <LoadMoreButton onClick={restoreAllAds}>Показать ещё</LoadMoreButton>
            )}
        </ProfileContainer>
    );
};

export default ProfilePage;
