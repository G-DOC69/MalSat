import React from 'react';
import './ProfilePageStyle.css'
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App.jsx';
import {getAdsByUserId, getUserByIdRequest, getUserRequest} from "../../app/api.js";
import {useCheckUser} from "../../hooks/useCheckUser.js";

const ProfilePage = () => {
    const { id } = useParams();
    const [user] = useContext(UserContext);
    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [ads, setAds] = useState([]);
    const [allAds, setAllAds] = useState([]); // Store all ads
    const [hasMoreAds, setHasMoreAds] = useState(false);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("access_token")

    useCheckUser()

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
            const response = await getUserByIdRequest(id,token)
            setProfile(response.data);
            const backads = await getAdsByUserId(id,token);
            setAllAds(backads.data);
            setAds(backads.data.slice(0, 10));
            if (backads.data.length > 10) {
                setHasMoreAds(true);
            } else {
                setHasMoreAds(false);
            }
        } catch (error) {
            console.error('Ошибка загрузки профиля:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchOwnProfile = async () => {
        try {
            const ownResponse = await getUserRequest(token)
            setProfile(ownResponse.data);
            setAllAds(null);
            setAds(null);
        } catch (error) {
            console.error('Ошибка загрузки собственного профиля:', error);
        } finally {
            setLoading(false);
        }
    };

    const restoreAllAds = () => {
        setAds(allAds);
        setHasMoreAds(false);
    };

    if (loading) {
        return <p>Загрузка...</p>;
    }

    return (
        <div>
            <div className="profile-header">
                <img src={profile?.photo} alt={profile?.username} className="profile-photo"/>
                <div>
                    <h2>{profile?.username}</h2>
                    <p>📞 {profile?.phone}</p>
                    {!id && ( // Only show for own profile
                        <button onClick={() => navigate('/user/change')}>Изменить профиль</button>
                    )}
                </div>
            </div>

            {ads &&(<h3>Объявления пользователя</h3>)}
            <div className="ads-container">
                {ads?.map(ad => (
                    <div key={ad.id} className="ad-card" onClick={() => navigate(`/ad/${ad.id}`)}>
                        <img src={ad.photo} alt={`${ad.animal} ${ad.breed}`}/>
                        <p>{ad.animal} {ad.breed}</p>
                        <p><strong>{ad.price}</strong></p>
                    </div>
                ))}
            </div>

            {hasMoreAds && (
                <button onClick={restoreAllAds}>Показать еще</button>
            )}
        </div>
    );
};

export default ProfilePage;
