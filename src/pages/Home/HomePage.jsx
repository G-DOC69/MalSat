import { useEffect, useState } from "react";
import { fetchTopAdsRequest } from "../../app/api";
import {
  BackgroundWrapper,
  Overlay,
  Container as HomeContainer,
  AdsGrid,
  SectionTitle,
  SectionHighlight
  
} from "./HomePageStyle";
import AdCard from "../../components/AdCard/AdCard.jsx";
import PostAdButton from "../../components/PostAdButton/PostAdButton.jsx";
import { useSyncUserContext } from "../../hooks/useSyncUserContext.js";
import {
  FeaturesWrapper,
  FeatureCard,
  FeatureTitle,
  FeatureText
} from "../../components/Ad/AdFeatures/AdFeaturesStyle";

const backgroundImages = ["/bg1.jpg", "/bg2.jpg", "/bg3.jpg", "/bg4.jpg"];

const HomePage = () => {
  const [ads, setAds] = useState([]);
  const [bgIndex, setBgIndex] = useState(0);

  useSyncUserContext();

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 10000); // ← теперь 10 секунд
  
    return () => clearInterval(interval);
  }, []);
  

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
            console.error("Ошибка при получении объявлений:", err.message);
        }
      }
    };
    getAds();
  }, []);

  return (
    <BackgroundWrapper style={{ backgroundImage: `url(${backgroundImages[bgIndex]})` }}>
      <Overlay />
      <HomeContainer>
      <SectionHighlight>
      <SectionTitle>Почему выбирают нас</SectionTitle></SectionHighlight>
        <FeaturesWrapper>
          <FeatureCard>
            <FeatureTitle>Проверенные объявления</FeatureTitle>
            <FeatureText>Каждое объявление проходит модерацию перед публикацией.</FeatureText>
          </FeatureCard>
          <FeatureCard>
            <FeatureTitle>Быстрая доставка</FeatureTitle>
            <FeatureText>Удобная доставка по всей стране прямо к двери.</FeatureText>
          </FeatureCard>
          <FeatureCard>
            <FeatureTitle>Поддержка 24/7</FeatureTitle>
            <FeatureText>Наша команда всегда на связи для вашей помощи.</FeatureText>
          </FeatureCard>
          <FeatureCard>
            <FeatureTitle>Удобный интерфейс</FeatureTitle>
            <FeatureText>Публикуйте и ищите объявления в пару кликов.</FeatureText>
          </FeatureCard>
        </FeaturesWrapper>
        
        <SectionHighlight><SectionTitle>Лучшие предложения</SectionTitle></SectionHighlight>
        <AdsGrid>
          {ads.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </AdsGrid>
        <PostAdButton />
      </HomeContainer>
    </BackgroundWrapper>
  );
};

export default HomePage;
