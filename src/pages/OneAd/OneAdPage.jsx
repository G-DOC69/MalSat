import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    getAdRequest,
    createChatRequest,
    addFavoriteRequest,
    checkFavoriteRequest,
    createDeliveryRequest,
    removeFavoriteRequest
} from "../../app/api";
import { useCheckUser } from "../../hooks/useCheckUser";
import { calculateAgeInMonths, calculateAgeInYears } from "../../app/store";
import {
    Container, InfoSection, Title, List,
    Button, FavoriteButton, DeliveryForm, FormGroup, Input, ErrorText
} from "./OneAdPageStyle";
import PhotoCarousel from "../../components/Ad/PhotoCarousel/PhotoCarousel.jsx";
import SellerPreview from "../../components/Ad/SellerPreview/SellerPreview.jsx";

const OneAdPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ad, setAd] = useState(null);
    const [loadingChat, setLoadingChat] = useState(false);
    const [favoriteLoading, setFavoriteLoading] = useState(false);
    const [deliveryFormVisible, setDeliveryFormVisible] = useState(false);
    const [deliveryForm, setDeliveryForm] = useState({ phone: '', address: '' });
    const [deliveryError, setDeliveryError] = useState('');
    const [deliverySubmitting, setDeliverySubmitting] = useState(false);
    const token = localStorage.getItem("access_token");

    const isValidPhone = (phone) => /^[\d\s()+-]{5,20}$/.test(phone);

    useCheckUser();

    useEffect(() => {
        const fetchAd = async () => {
            try {
                const res = await getAdRequest(id, token);
                setAd(res.data);
                if (!res.data.isMine) {
                    const favRes = await checkFavoriteRequest(id, token);
                    setAd(prev => ({ ...prev, isFavorite: favRes.data }));
                }
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
            const res = await createChatRequest(ad.id, token);
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
                ? await removeFavoriteRequest(id, token)
                : await addFavoriteRequest(id, token);
            const res = await checkFavoriteRequest(id, token);
            setAd(prev => ({ ...prev, isFavorite: res.data }));
        } catch (err) {
            console.error("Ошибка при избранном:", err);
        } finally {
            setFavoriteLoading(false);
        }
    };

    const handleDeliverySubmit = async (e) => {
        e.preventDefault();
        setDeliveryError('');
        setDeliverySubmitting(true);
        if (!isValidPhone(deliveryForm.phone)) {
            setDeliveryError("Введите корректный номер телефона.");
            setDeliverySubmitting(false);
            return;
        }
        try {
            await createDeliveryRequest(token, {
                adId: ad.id,
                phone: deliveryForm.phone,
                address: deliveryForm.address
            });
            setDeliveryFormVisible(false);
            setDeliveryForm({ phone: '', address: '' });
        } catch (err) {
            console.error("Ошибка при создании доставки:", err);
            setDeliveryError("Ошибка при создании доставки. Попробуйте позже.");
        } finally {
            setDeliverySubmitting(false);
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

                {token && !ad.isMine && (
                    <>
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

                        <Button onClick={() => setDeliveryFormVisible(true)}>
                            Заказать доставку
                        </Button>

                        {deliveryFormVisible && (
                            <DeliveryForm onSubmit={handleDeliverySubmit}>
                                <FormGroup>
                                    <label htmlFor="phone">Телефон</label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        value={deliveryForm.phone}
                                        onChange={(e) => setDeliveryForm(prev => ({ ...prev, phone: e.target.value }))}
                                        required
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <label htmlFor="address">Адрес</label>
                                    <Input
                                        id="address"
                                        name="address"
                                        value={deliveryForm.address}
                                        onChange={(e) => setDeliveryForm(prev => ({ ...prev, address: e.target.value }))}
                                        required
                                    />
                                </FormGroup>

                                {deliveryError && <ErrorText>{deliveryError}</ErrorText>}

                                <Button type="submit" disabled={deliverySubmitting}>
                                    {deliverySubmitting ? "Отправка..." : "Подтвердить доставку"}
                                </Button>
                            </DeliveryForm>
                        )}
                    </>
                )}
            </InfoSection>

            <PhotoCarousel photos={ad.photoUrls} />
        </Container>
    );
};

export default OneAdPage;
