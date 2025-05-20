import { useEffect, useState } from "react";
import { fetchTopAdsRequest } from "../../app/api";
import {
  Container,
  AdsGrid,
  LoadingText,
  EmptyText,
  PageTitle,
} from "./HomePageStyle";
import AdCard from "../../components/AdCard/AdCard.jsx";
import PostAdButton from "../../components/PostAdButton/PostAdButton.jsx";

const HomePage = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAds = async () => {
      try {
        const response = await fetchTopAdsRequest();
        if (response.status === 200) {
          setAds(response.data || []);
        }
      } catch (error) {
        console.error("Ошибка при получении объявлений:", error);
      } finally {
        setLoading(false);
      }
    };

    getAds();
  }, []);

  return (
    <Container>
      <PageTitle>Лучшие объявления по скоту</PageTitle>

      {loading ? (
        <LoadingText>Загрузка объявлений...</LoadingText>
      ) : ads.length === 0 ? (
        <EmptyText>Объявлений пока нет. Будьте первым, кто разместит!</EmptyText>
      ) : (
        <AdsGrid>
          {ads.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </AdsGrid>
      )}

      <PostAdButton />
    </Container>
  );
};

export default HomePage;
