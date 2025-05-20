import { useEffect, useState } from "react";
import { fetchTopAdsRequest } from "../../app/api";
import { Container, AdsGrid, SectionTitle } from "./HomePageStyle";
import AdCard from "../../components/AdCard/AdCard.jsx";
import PostAdButton from "../../components/PostAdButton/PostAdButton.jsx";
import { useSyncUserContext } from "../../hooks/useSyncUserContext.js";
import {
  FeaturesWrapper,
  FeatureCard,
  FeatureTitle,
  FeatureText
} from "../../components/Ad/AdFeatures/AdFeaturesStyle";

const HomePage = () => {
  const [ads, setAds] = useState([]);

  useSyncUserContext();

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
      <SectionTitle>Почему выбирают нас</SectionTitle>
      <FeaturesWrapper>
        <FeatureCard>
          <div>
            <FeatureTitle>Проверенные объявления</FeatureTitle>
            <FeatureText>Каждое объявление проходит модерацию перед публикацией.</FeatureText>
          </div>
        </FeatureCard>
        <FeatureCard>
          <div>
            <FeatureTitle>Быстрая доставка</FeatureTitle>
            <FeatureText>Удобная доставка по всей стране прямо к двери.</FeatureText>
          </div>
        </FeatureCard>
        <FeatureCard>
          <div>
            <FeatureTitle>Поддержка 24/7</FeatureTitle>
            <FeatureText>Наша команда всегда на связи для вашей помощи.</FeatureText>
          </div>
        </FeatureCard>
        <FeatureCard>
          <div>
            <FeatureTitle>Удобный интерфейс</FeatureTitle>
            <FeatureText>Публикуйте и ищите объявления в пару кликов.</FeatureText>
          </div>
        </FeatureCard>
      </FeaturesWrapper>

      <SectionTitle>Лучшие предложения</SectionTitle>
      <AdsGrid>
        {ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </AdsGrid>
      <PostAdButton />
    </Container>
  );
};

export default HomePage;
