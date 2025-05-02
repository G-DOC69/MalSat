import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App.jsx';
import { getAdsByUserIdRequest, getUserByIdRequest, getUserRequest } from "../../app/api.js";
import { useCheckUser } from "../../hooks/useCheckUser.js";
import styled from "styled-components";

const ProfileContainer = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: auto;
    padding: 20px;
`;

const ProfileHeader = styled.div`
    display: flex;
    align-items: center;
    background: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    gap: 20px;
    margin-bottom: 20px;

    @media (max-width: 600px) {
        flex-direction: column;
        text-align: center;
    }
`;

const ProfilePhoto = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
`;

const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;

    h2 {
        font-size: 32px;
    }
`;

const EditButton = styled.button`
    background: #1e3a8a;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.3s;
    margin-top: 10px;

    &:hover {
        background: #3b82f6;
    }
`;

const AdsTitle = styled.h3`
    margin-top: 20px;
    text-align: center;
`;

const AdsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
    padding: 10px;
`;

const AdCard = styled.div`
    background: white;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.05);
    }

    img {
        width: 100%;
        height: 150px;
        object-fit: cover;
        border-radius: 8px;
    }

    p {
        margin: 5px 0;
    }

    strong {
        color: #1e3a8a;
        font-size: 16px;
    }
`;

const LoadMoreButton = styled.button`
    display: block;
    margin: 20px auto;
    background: #1e3a8a;
    color: white;
    padding: 12px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
        background: #3b82f6;
    }
`;

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

    const fetchProfile = async (id) => {
        try {
            const response = await getUserByIdRequest(id, token);
            setProfile(response.data);

            const adsRes = await getAdsByUserIdRequest(id, token);
            setAllAds(adsRes.data || []);
            setAds((adsRes.data || []).slice(0, 10));
            setHasMoreAds((adsRes.data || []).length > 10);
        } catch (error) {
            console.error("Ошибка загрузки профиля:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchOwnProfile = async () => {
        try {
            const response = await getUserRequest(token);
            setProfile(response.data);
            setAllAds([]);
            setAds([]);
        } catch (error) {
            console.error("Ошибка загрузки собственного профиля:", error);
        } finally {
            setLoading(false);
        }
    };

    const restoreAllAds = () => {
        setAds(allAds);
        setHasMoreAds(false);
    };

    if (loading) {
        return <p style={{ textAlign: "center" }}>Загрузка...</p>;
    }

    return (
        <ProfileContainer>
            <ProfileHeader>
                <ProfilePhoto src={profile?.photoUrl || '/default-user.png'} alt={profile?.username} />
                <ProfileInfo>
                    <h2>{profile?.username}</h2>
                    <p>📞 {profile?.phone || "Номер не указан"}</p>
                    {!id && (
                        <EditButton onClick={() => navigate('/user/change')}>
                            Изменить профиль
                        </EditButton>
                    )}
                </ProfileInfo>
            </ProfileHeader>

            {ads.length > 0 && <AdsTitle>Объявления пользователя</AdsTitle>}
            <AdsContainer>
                {ads?.map((ad) => (
                    <AdCard key={ad.id} onClick={() => navigate(`/ad/${ad.id}`)}>
                        <img src={ad.photoUrl} alt={`${ad.animal} ${ad.breed}`} />
                        <p>{ad.animal} {ad.breed}</p>
                        <p><strong>{ad.price} Сом</strong></p>
                    </AdCard>
                ))}
            </AdsContainer>

            {hasMoreAds && (
                <LoadMoreButton onClick={restoreAllAds}>Показать ещё</LoadMoreButton>
            )}
        </ProfileContainer>
    );
};

export default ProfilePage;
