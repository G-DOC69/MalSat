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
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 24px;
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
