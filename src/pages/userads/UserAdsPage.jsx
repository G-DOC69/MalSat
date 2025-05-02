import React, {useState} from 'react';
import './UserAdsPageStyle.css'
import { useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useCheckUser} from "../../hooks/useCheckUser.js";
import {getUserAdsRequest} from "../../app/api.js";
import styled    from "styled-components";

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const AdsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const AdCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  background: white;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const AdImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const AdInfo = styled.div`
  padding: 10px;
`;

const AdTitle = styled.h2`
  font-size: 16px;
  margin-bottom: 5px;
`;

const AdText = styled.p`
  font-size: 14px;
  color: #555;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  background: ${({ disabled }) => (disabled ? "#ddd" : "#1e3a8a")};
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 8px;
  font-size: 14px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background 0.3s;
  margin: 0 5px;

  &:hover:not(:disabled) {
    background: #3b82f6;
  }
`;

const PageNumber = styled.p`
  margin: 0 10px;
  font-size: 16px;
`;

const UserAdsPage = () => {
    const [ads, setAds] = useState([]);
    const [filteredAds, setFilteredAds] = useState([]);
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const navigate = useNavigate();
    const itemsPerPage = 7;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const token = localStorage.getItem("access_token");

    useCheckUser();

    useEffect(() => {
        getThisUserAds();
    }, []);

    useEffect(() => {
        updateFilteredAds();
    }, [page, ads]);

    const updateFilteredAds = () => {
        const startIndex = (page - 1) * itemsPerPage;
        setFilteredAds(ads.slice(startIndex, startIndex + itemsPerPage));
    };

    const getThisUserAds = async () => {
        try {
            const response = await getUserAdsRequest(token);
            setAds(response.data);
            setFilteredAds(response.data.slice(0, itemsPerPage));
            setTotalItems(response.data.length);
        } catch (err) {
            console.error('Ошибка загрузки объявлений:', err);
        }
    };

    const calculateAgeInMonths = (birthDate) => {
        const birth = new Date(birthDate);
        const today = new Date();
        return (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth());
    };

    const calculateAgeInYears = (months) => {
        switch (Math.floor(months / 12)) {
            case 0: return `${months} мес`;
            case 1: return '1 год';
            case 2: case 3: case 4: return `${Math.floor(months / 12)} года`;
            default: return `${Math.floor(months / 12)} лет`;
        }
    };

    const handleNextPage = () => {
        const nextPage = page + 1;
        if ((nextPage - 1) * itemsPerPage < totalItems) {
            setPage(nextPage);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <Container>
            <Title>Мои Объявления</Title>
            <AdsGrid>
                {filteredAds.map((ad) => (
                    <AdCard key={ad.id} onClick={() => navigate(`/ad/${ad.id}`)}>
                        <AdImage src={ad.photoUrl} alt={ad.breed} />
                        <AdInfo>
                            <AdTitle>{ad.breed} ({ad.animal})</AdTitle>
                            <AdText>
                                Возраст: {calculateAgeInMonths(ad.age)} мес ({calculateAgeInYears(calculateAgeInMonths(ad.age))})
                            </AdText>
                            <AdText>Регион: {ad.region}</AdText>
                            <AdText>Цена: {ad.price} сом</AdText>
                        </AdInfo>
                    </AdCard>
                ))}
            </AdsGrid>

            <Pagination>
                <PageButton onClick={handlePrevPage} disabled={page === 1}>Назад</PageButton>
                <PageNumber>{page}/{totalPages}</PageNumber>
                <PageButton onClick={handleNextPage} disabled={page * itemsPerPage >= totalItems}>Вперед</PageButton>
            </Pagination>
        </Container>
    );
};

export default UserAdsPage;