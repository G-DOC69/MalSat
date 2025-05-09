import { useState } from 'react';
import AdminUserPanel from './AdminUserPanel';
import {
    ListContainer,
    SearchInput,
    UserBlock,
    UserInfo,
    ExpandButton
} from './styles/AdminUserListStyle';

const AdminUserList = ({
                           users,
                           token,
                           setAds,
                           setChats,
                           setAdOwnerId,
                           setShowAdList,
                           setShowChatList,
                           setSelectedAd,
                           setSelectedChat
                       }) => {
    const [query, setQuery] = useState('');
    const [expandedUserId, setExpandedUserId] = useState(null);

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase()) ||
        user.phone.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <ListContainer>
            <SearchInput
                type="text"
                placeholder="Поиск по имени, email или телефону"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {filteredUsers.map(user => (
                <UserBlock key={user.id}>
                    <UserInfo>
                        <p><strong>{user.username}</strong></p>
                        <p>Email: {user.email}</p>
                        <p>Телефон: {user.phone}</p>
                        <p>Статус: {user.enabled ? 'Активен' : 'Отключен'}</p>
                    </UserInfo>
                    <ExpandButton onClick={() => setExpandedUserId(prev => prev === user.id ? null : user.id)}>
                        {expandedUserId === user.id ? 'Скрыть' : 'Открыть'}
                    </ExpandButton>
                    {expandedUserId === user.id && (
                        <AdminUserPanel
                            user={user}
                            token={token}
                            setAds={setAds}
                            setChats={setChats}
                            setAdOwnerId={setAdOwnerId}
                            setShowAdList={setShowAdList}
                            setShowChatList={setShowChatList}
                            setSelectedAd={setSelectedAd}
                            setSelectedChat={setSelectedChat}
                        />
                    )}
                </UserBlock>
            ))}
        </ListContainer>
    );
};

export default AdminUserList;
