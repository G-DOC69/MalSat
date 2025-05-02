import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { fetchTopAdsRequest } from "../../app/api.js";

const Container = styled.div`
    width: 100%;
    height: 80vh;
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
`;

const AdsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 12px;
    padding: 16px;
    width: 100%;
    max-width: 1200px;
`;

const AdCard = styled.div`
    background: #e0f2fe;
    border-radius: 12px;
    padding: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: scale(1.05);
    }
`;

const Image = styled.img`
    width: 100%;
    height: auto;
    max-height: 150px;
    object-fit: cover;
    border-radius: 8px;

    @media (max-width: 600px) {
        max-height: 120px;
    }
`;

const Info = styled.p`
    margin: 6px 0;
    font-size: clamp(14px, 2vw, 18px);
    font-weight: bold;
    color: #1e3a8a;
    text-align: center;
`;

const Price = styled.p`
    font-size: clamp(16px, 2.2vw, 20px);
    font-weight: bold;
    color: #0284c7;
    text-align: center;
`;

const HomePage = () => {
    const [ads, setAds] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getAds = async () => {
            try {
                const response = await fetchTopAdsRequest();
                if (response.status === 200 || response.status === 201) {
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
            <AdsContainer>
                {ads.map(ad => (
                    <AdCard key={ad.id} onClick={() => navigate(`/ad/${ad.id}`)}>
                        <Image src={ad.photoUrl} alt={`${ad.animal} ${ad.breed}`} />
                        <Info>{ad.animal} {ad.breed}</Info>
                        <Price>{ad.price} Сом</Price>
                    </AdCard>
                ))}
            </AdsContainer>
        </Container>
    );
};

export default HomePage;
