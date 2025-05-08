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
import PhotoCarousel from "../../components/Ad/PhotoCarousel/PhotoCarousel";
import SellerPreview from "../../components/Ad/SellerPreview/SellerPreview";

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

    if (!ad) return <p className="text-center mt-20 text-gray-600">Загрузка...</p>;

    return (
        <div className="max-w-5xl mx-auto px-4 pt-24 pb-12 flex flex-col lg:flex-row gap-10">
            <div className="flex-1 space-y-4">
                <h1 className="text-2xl font-semibold text-gray-900">
                    Купить {ad.breed} ({ad.animal})
                </h1>

                <ul className="space-y-2 text-gray-700 text-base">
                    <li>📍 Регион Продажи: {ad.region}</li>
                    <li>🐾 Порода: {ad.breed}</li>
                    <li>
                        🕑 Возраст: {calculateAgeInMonths(ad.age)} мес (
                        {calculateAgeInYears(calculateAgeInMonths(ad.age))})
                    </li>
                    <li>📜 Описание: {ad.description}</li>
                    <li>💰 Цена: {ad.price} сом</li>
                    <li>👁 Просмотры: {ad.viewCount}</li>
                </ul>

                <SellerPreview seller={ad.seller} />

                <button
                    onClick={handleChat}
                    disabled={loadingChat}
                    className={`w-full md:w-auto px-6 py-2 text-white rounded-lg transition ${
                        loadingChat ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
                    }`}
                >
                    {loadingChat ? "Загрузка..." : "💬 Чат с продавцом"}
                </button>

                <button
                    onClick={toggleFavorite}
                    disabled={favoriteLoading}
                    className={`w-full md:w-auto px-6 py-2 border border-gray-400 rounded-lg transition ${
                        ad.isFavorite ? "bg-red-100 hover:bg-red-200" : "bg-gray-100 hover:bg-gray-200"
                    }`}
                >
                    {favoriteLoading
                        ? "Обновление..."
                        : ad.isFavorite
                        ? "Удалить из избранного"
                        : "Добавить в избранное"}
                </button>
            </div>

            <div className="w-full lg:w-[50%]">
                <PhotoCarousel photos={ad.photoUrls} />
            </div>
        </div>
    );
};

export default OneAdPage;
