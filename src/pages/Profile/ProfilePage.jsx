import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { getUserByIdRequest, getUserRequest } from "../../app/api";
import { useCheckUser } from "../../hooks/useCheckUser";
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

    if (loading) return <p className="text-center mt-20 text-gray-600">Загрузка...</p>;

    return (
        <div className="max-w-6xl mx-auto px-4 pt-24 pb-12">
            <ProfileHeaderBlock
                username={profile.username}
                phone={profile.phone}
                photoUrl={profile.photoUrl}
                isOwn={!id}
                onEdit={() => navigate("/user/change")}
            />

            {ads.length > 0 && (
                <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-6">
                    Объявления пользователя
                </h2>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {ads.map(ad => (
                    <AdCard key={ad.id} ad={ad} />
                ))}
            </div>

            {hasMoreAds && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={restoreAllAds}
                        className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition"
                    >
                        Показать ещё
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
