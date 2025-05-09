import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getFavoritesRequest} from "../../app/api";
import { useCheckUser } from "../../hooks/useCheckUser";
import {applyFilters, calculateAgeInMonths} from "../../app/store";
import { FixedSizeList as List } from "react-window";
import AdCard from "../../components/AdCard/AdCard";
import FilterWindow from "../../components/FilterWindow/FilterWindow";
import { Container, Title, LoadingText, ErrorText, EmptyText, BackToTopButton, ResultCount } from './FavoriteAdsPageStyle.js';
import PostAdButton from "../../components/PostAdButton/PostAdButton.jsx";

const FavoriteAdsPage = () => {
    const token = localStorage.getItem("access_token");
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

    const listRef = useRef(null);
    const navigate = useNavigate();

    useCheckUser();

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        setError(null);

        getFavoritesRequest(token,controller.signal)
            .then(res => {
                const formatted = res.data.map(ad => ({
                    ...ad,
                    ageMonths: calculateAgeInMonths(ad.age)
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

    const Row = ({ index, style }) => (
        <div style={style}>
            <AdCard ad={filteredAds[index]} navigate={navigate} />
        </div>
    );

    return (
        <Container>
            <Title>Избранные Объявления</Title>
            {!loading && !error && (
                <ResultCount>Найдено: {filteredAds.length} объявлений</ResultCount>
            )}
            <FilterWindow filter={filter} setFilter={setFilter} ads={ads} />
            {loading && <LoadingText>Загрузка...</LoadingText>}
            {error && <ErrorText>{error}</ErrorText>}
            {!loading && filteredAds.length === 0 && <EmptyText>Ничего не найдено</EmptyText>}
            {!loading && filteredAds.length > 0 && (
                <List
                    height={600}
                    itemCount={filteredAds.length}
                    itemSize={180}
                    width={'100%'}
                    ref={listRef}
                >
                    {Row}
                </List>
            )}
            <PostAdButton />
            {showBackToTop && <BackToTopButton onClick={scrollToTop}>Наверх</BackToTopButton>}
        </Container>
    );
};

export default FavoriteAdsPage;
