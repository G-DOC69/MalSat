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
                if (response.status === 200) {
                    setAds(response.data || []);
                }
            } catch (error) {
                console.error("Ошибка при получении объявлений:", error);
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
