import { useEffect, useState } from "react";
import { fetchTopAdsRequest } from "../../app/api";
import { Container, AdsGrid } from "./HomePageStyle";
import AdCard from "../../components/AdCard/AdCard.jsx";
import PostAdButton from "../../components/PostAdButton/PostAdButton.jsx";
import {useSyncUserContext} from "../../hooks/useSyncUserContext.js";

const HomePage = () => {
    const [ads, setAds] = useState([]);

    useSyncUserContext()

    useEffect(() => {
        const getAds = async () => {
            try {
                const response = await fetchTopAdsRequest();

                if (!response || !Array.isArray(response.data)) {
                    throw new Error("Некорректный формат данных.");
                }

                setAds(response.data);
            } catch (err) {
                const code = err.response?.status;

                switch (code) {
                    case 400:
                        console.error("Неверный запрос к серверу.");
                        break;
                    case 500:
                        console.error("Ошибка сервера при получении объявлений.");
                        break;
                    default:
                        console.error("Ошибка при получении объявлений:", err.response?.data?.message || err.message);
                }
            }
        };

        getAds();
    }, []);

    return (
        <Container>
            <AdsGrid>
                {ads.map(ad => (
                    <AdCard key={ad.id} ad={ad} />
                ))}
            </AdsGrid>
            <PostAdButton />
        </Container>
    );
};

export default HomePage;
