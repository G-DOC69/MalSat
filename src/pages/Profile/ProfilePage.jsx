import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
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

    const [profile, setProfile] = useState(null);
    const [ads, setAds] = useState([]);
    const [allAds, setAllAds] = useState([]);
    const [hasMoreAds, setHasMoreAds] = useState(false);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("access_token");

    useCheckUser();

    useEffect(() => {
        setLoading(true);
        fetchProfileData(id);
    }, [id, user]);

    const fetchProfileData = async (targetId = null) => {
        try {
            const res = targetId
                ? await getUserByIdRequest(targetId, token)
                : await getUserRequest(token );
            const profileData = res.data;
            setProfile(profileData);

            const adsData = profileData.advertisements || [];
            setAllAds(adsData);
            setAds(adsData.slice(0, 10));
            setHasMoreAds(adsData.length > 10);
        } catch (err) {
            console.error("Ошибка загрузки профиля:", err);
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
                profile={profile}
                isOwn={!id}
            />

            {ads.length > 0 && <AdsTitle>Объявления пользователя</AdsTitle>}
            {ads.length === 0 && !loading && (
                <p style={{ textAlign: "center" }}>У пользователя нет объявлений.</p>
            )}
            <AdsContainer>
                {ads.map(ad => (
                    <AdCard key={ad.id} ad={ad} />
                ))}
            </AdsContainer>

            {hasMoreAds && (
                <LoadMoreButton onClick={restoreAllAds} aria-label="Показать больше объявлений">Показать ещё</LoadMoreButton>
            )}
        </ProfileContainer>
    );
};

export default ProfilePage;
