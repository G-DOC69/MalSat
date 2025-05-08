import { useEffect, useState } from "react";
import { fetchTopAdsRequest } from "../../app/api";
import AdCard from "../../components/AdCard/AdCard";
import PostAdButton from "../../components/PostAdButton/PostAdButton";

const HomePage = () => {
    const [ads, setAds] = useState([]);

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
        <div className="max-w-7xl mx-auto px-4 pt-24 pb-8">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
                Лучшие Объявления
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {ads.map(ad => (
                    <AdCard key={ad.id} ad={ad} />
                ))}
            </div>

            <PostAdButton />
        </div>
    );
};

export default HomePage;
