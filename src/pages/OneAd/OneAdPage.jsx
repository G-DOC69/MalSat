import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    getAdRequest,
    getChatIdRequest,
    addToFavoriteRequest,
    removeFromFavoriteRequest,
    isFavoriteRequest
} from "../../app/api";
import { useCheckUser } from "../../hooks/useCheckUser";
import { calculateAgeInMonths, calculateAgeInYears } from "../../app/store";
import {
    Container, InfoSection, Title, List,
    Button, FavoriteButton
} from "./OneAdPageStyle";
import PhotoCarousel from "../../components/Ad/PhotoCarousel/PhotoCarousel.jsx";
import SellerPreview from "../../components/Ad/SellerPreview/SellerPreview.jsx";

const OneAdPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ad, setAd] = useState(null);
    const [loadingChat, setLoadingChat] = useState(false);
    const [favoriteLoading, setFavoriteLoading] = useState(false);
    const token = localStorage.getItem("access_token");

    useCheckUser();

    useEffect(() => {
        const fetchAd = async () => {
            try {
                const res = await getAdRequest(id, token);
                setAd(res.data);
            } catch (err) {
                console.error("Ошибка при загрузке объявления:", err);
            }
        };
        fetchAd();
    }, [id]);

    const handleChat = async () => {
        if (!ad) return;
        setLoadingChat(true);
        try {
            const res = await getChatIdRequest(ad.id, token);
            navigate(`/chat/${res.data.chatId}`);
        } catch (err) {
            console.error("Ошибка при открытии чата:", err);
        } finally {
            setLoadingChat(false);
        }
    };

    const toggleFavorite = async () => {
        if (!ad) return;
        setFavoriteLoading(true);
        try {
            ad.isFavorite
                ? await removeFromFavoriteRequest(id, token)
                : await addToFavoriteRequest(id, token);
            const res = await isFavoriteRequest(id, token);
            setAd(prev => ({ ...prev, isFavorite: res.data }));
        } catch (err) {
            console.error("Ошибка при избранном:", err);
        } finally {
            setFavoriteLoading(false);
        }
    };

    if (!ad) return <p>Загрузка...</p>;

    return (
        <Container>
            <InfoSection>
                <Title>{`Купить ${ad.breed} (${ad.animal})`}</Title>
                <List>
                    <li>📍 Регион Продажи: {ad.region}</li>
                    <li>🐾 Порода: {ad.breed}</li>
                    <li>
                        🕑 Возраст: {calculateAgeInMonths(ad.age)} мес (
                        {calculateAgeInYears(calculateAgeInMonths(ad.age))})
                    </li>
                    <li>📜 Описание: {ad.description}</li>
                    <li>💰 Цена: {ad.price} сом</li>
                    <li>👁 Просмотры: {ad.viewCount}</li>
                </List>

                <SellerPreview seller={ad.seller} />

                <Button onClick={handleChat} disabled={loadingChat}>
                    {loadingChat ? "Загрузка..." : "💬 Чат с продавцом"}
                </Button>

                <FavoriteButton onClick={toggleFavorite} disabled={favoriteLoading}>
                    {favoriteLoading
                        ? "Обновление..."
                        : ad.isFavorite
                            ? "Удалить из избранного"
                            : "Добавить в избранное"}
                </FavoriteButton>
            </InfoSection>

            <PhotoCarousel photos={ad.photoUrls} />
        </Container>
    );
};

export default OneAdPage;
