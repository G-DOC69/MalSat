import {
    getAdOfUserAdmin,
    deleteAdAdmin
} from '../../app/adminApi.js';
import {
    ListContainer,
    SearchInput,
    AdCard,
    AdInfo,
    AdImage,
    ActionButton
} from './styles/AdminAdListStyle';
import {useState} from "react";

const AdminAdList = ({ ads, token, userId, onSelectAd, onClearChat }) => {
    const [query, setQuery] = useState('');

    const filteredAds = ads.filter(ad =>
        ad.animal.toLowerCase().includes(query) ||
        ad.breed.toLowerCase().includes(query) ||
        ad.region.toLowerCase().includes(query) ||
        ad.price.toString().includes(query)
    );

    const handleGetFull = async (adId) => {
        const res = await getAdOfUserAdmin(userId, adId, token);
        onClearChat();
        onSelectAd(res.data);
    };

    const handleDelete = async (adId) => {
        await deleteAdAdmin(adId, token);
    };

    return (
        <ListContainer>
            <h3>Объявления</h3>
            <SearchInput
                type="text"
                placeholder="Поиск по животному, породе, региону или цене"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {filteredAds.map(ad => (
                <AdCard key={ad.id}>
                    <AdImage src={ad.photoUrl} alt="ad" />
                    <AdInfo>
                        <p>{ad.animal} — {ad.breed}</p>
                        <p>Регион: {ad.region}</p>
                        <p>Цена: {ad.price}</p>
                        <p>Приоритет: {ad.priority}</p>
                    </AdInfo>
                    <ActionButton onClick={() => handleGetFull(ad.id)}>Подробнее</ActionButton>
                    <ActionButton onClick={() => handleDelete(ad.id)}>Удалить</ActionButton>
                </AdCard>
            ))}
        </ListContainer>
    );
};

export default AdminAdList;
