import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllAdsRequest } from '../../app/api';
import { applyFilters, calculateAgeInMonths } from '../../app/store';
import {
  Container,
  Title,
  LoadingText,
  ErrorText,
  EmptyText,
  BackToTopButton,
  ResultCount
} from './AllAdsPageStyle';
import AdCard from '../../components/AdCard/AdCard';
import FilterWindow from '../../components/FilterWindow/FilterWindow';
import PostAdButton from '../../components/PostAdButton/PostAdButton';
import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 24px;
  animation: ${fadeInUp} 0.6s ease;
`;

// Блок с преимуществами
const InfoFeatures = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 16px;
  margin: 40px 0 20px;
`;

const FeatureCard = styled.div`
  background: #f9fafb;
  border-radius: 14px;
  padding: 18px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.04);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 18px rgba(0,0,0,0.06);
  }

  img {
    width: 36px;
    height: 36px;
  }

  h4 {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    color: #1e3a8a;
  }

  p {
    margin: 4px 0 0;
    font-size: 14px;
    color: #475569;
  }
`;

const AllAdsPage = () => {
  const [ads, setAds] = useState([]);
  const [filteredAds, setFilteredAds] = useState([]);
  const [filter, setFilter] = useState({
    animal: '',
    breed: '',
    minAge: '',
    maxAge: '',
    region: '',
    minPrice: '',
    maxPrice: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    getAllAdsRequest(controller.signal)
      .then(res => {
        const formatted = res.data.map(ad => ({
          ...ad,
          ageMonths: ad.age ? calculateAgeInMonths(ad.age) : null
        }));
        setAds(formatted);
        setLoading(false);
      })
      .catch(err => {
        if (err.name !== 'CanceledError') {
          setError('Ошибка загрузки.');
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    applyFilters(filter, ads, null, setFilteredAds);
  }, [filter, ads]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container>
      <Title>Все Объявления</Title>
      {!loading && !error && (
        <ResultCount>Найдено: {filteredAds.length} объявлений</ResultCount>
      )}

      <FilterWindow filter={filter} setFilter={setFilter} ads={ads} />

      {/* Блок с преимуществами */}
      <InfoFeatures>
        <FeatureCard>
          <img src="/icons/check.svg" alt="Проверка" />
          <div>
            <h4>Проверка</h4>
            <p>Целостность товара перед отправкой</p>
          </div>
        </FeatureCard>
        <FeatureCard>
          <img src="/icons/speed.svg" alt="Оперативность" />
          <div>
            <h4>Оперативность</h4>
            <p>Быстрое оформление заказа</p>
          </div>
        </FeatureCard>
        <FeatureCard>
          <img src="/icons/box.svg" alt="Доставка" />
          <div>
            <h4>Доставка</h4>
            <p>Доставка по всему Кыргызстану</p>
          </div>
        </FeatureCard>
        <FeatureCard>
          <img src="/icons/secure.svg" alt="Безопасность" />
          <div>
            <h4>100% Безопасно</h4>
            <p>Гарантированная оплата и защита</p>
          </div>
        </FeatureCard>
      </InfoFeatures>

      {loading && <LoadingText>Загрузка...</LoadingText>}
      {error && <ErrorText>{error}</ErrorText>}
      {!loading && filteredAds.length === 0 && <EmptyText>Ничего не найдено</EmptyText>}

      {!loading && filteredAds.length > 0 && (
        <Grid>
          {filteredAds.map((ad, index) => (
            <AdCard key={ad.id || index} ad={ad} navigate={navigate} />
          ))}
        </Grid>
      )}

      <PostAdButton />

      {showBackToTop && <BackToTopButton onClick={scrollToTop}>Наверх</BackToTopButton>}
    </Container>
  );
};

export default AllAdsPage;
