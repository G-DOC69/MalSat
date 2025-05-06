import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    HeaderContainer,
    HeaderPhoto,
    HeaderInfo,
    EditButton
} from './ProfileHeaderBlockStyle';

const ProfileHeaderBlock = ({ profile, isOwn }) => {
    const navigate = useNavigate();

    return (
        <HeaderContainer>
            <HeaderPhoto src={profile?.photoUrl || '/default-user.png'} alt={profile?.username} />
            <HeaderInfo>
                <h2>{profile?.username}</h2>
                <p>📞 {profile?.phone || "Номер не указан"}</p>
                {isOwn && (
                    <EditButton onClick={() => navigate('/user/change')}>
                        Изменить профиль
                    </EditButton>
                )}
            </HeaderInfo>
        </HeaderContainer>
    );
};

export default ProfileHeaderBlock;
