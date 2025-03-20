import React from 'react';
import './OneAdPageStyle.css'
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {useCheckUser} from "../../hooks/useCheckUser.js";
import {getAdRequest, getChatIdRequest} from "../../app/api.js";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  max-width: 900px;
  margin: auto 0;
`;

const InfoSection = styled.div`
  flex: 1;
  min-width: 300px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #1e3a8a;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    padding: 5px 0;
    font-size: 16px;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  min-width: 300px;
  text-align: center;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  max-width: 350px;
  border-radius: 8px;
`;

const Button = styled.button`
  background: #1e3a8a;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
  width: 100%;

  &:hover {
    background: #3b82f6;
  }
`;

const SellerSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  padding: 10px;
  background: #f3f4f6;
  border-radius: 8px;
`;

const SellerPhoto = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const SellerName = styled.p`
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const OneAdPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ad, setAd] = useState({
        id: "",
        animal: "",
        breed: "",
        age: "",
        region: "",
        description: "",
        seller: {
            id: "",
            name: "",
            phone: "",
            profilePic: "",
        },
        photos: [],
    });
    const [loadingChat, setLoadingChat] = useState(false);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const token = localStorage.getItem("access_token")

    useCheckUser()

    useEffect(() => {
        fetchAd();
    }, []);

    const fetchAd = async () => {
        try{
            const response = await getAdRequest(id,token);
            setAd(response.data);
        } catch (error){
            console.log(error);
        }
    };
    const handleChat = async () => {
        setLoadingChat(true);
        try {
            await getChatIdRequest(id,token);
            navigate(`/chat/`);
        } catch (error) {
            console.error('Error fetching chat:', error);
        } finally {
            setLoadingChat(false);
        }
    };

    const calculateAgeInMonths = (birthDate) => {
        const birth = new Date(birthDate);
        const today = new Date();
        return (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth());
    };

    const calculateAgeInYears = (months) => {
        switch (Math.floor(months/12)){
            case 0:
                return (Math.floor(months/12)+' лет');
            case 1:
                return (Math.floor(months/12)+' год')
            case 2:
                return (Math.floor(months/12)+' года')
            case 3:
                return (Math.floor(months/12)+' года')
            case 4:
                return (Math.floor(months/12)+' года')
            default:
                return (Math.floor(months/12)+' лет')
        }
    }

    return (
        <Container>
            {/* Информация о товаре */}
            <InfoSection>
                {ad.breed && ad.animal && <Title>Купить {ad.breed} ({ad.animal})</Title>}
                <List>
                    {ad.region && <li>📍 Регион Продажи: {ad.region}</li>}
                    {ad.breed && <li>🐾 Порода: {ad.breed}</li>}
                    {ad.age && <li>🕑 Возраст: {calculateAgeInMonths(ad.age)} месяцев ({calculateAgeInYears(calculateAgeInMonths(ad.age))})</li>}
                    {ad.description && <li>📜 Описание: {ad.description}</li>}
                </List>
            </InfoSection>

            {/* Фотографии */}
            <ImageSection>
                {ad.photos.length > 0 && (
                    <>
                        <button onClick={() => setCurrentPhotoIndex((prev) => (prev > 0 ? prev - 1 : ad.photos.length - 1))}>
                            ◀
                        </button>
                        <Image src={ad.photos[currentPhotoIndex]} alt="Ad" />
                        <button onClick={() => setCurrentPhotoIndex((prev) => (prev < ad.photos.length - 1 ? prev + 1 : 0))}>
                            ▶
                        </button>
                    </>
                )}
            </ImageSection>

            {/* Продавец */}
            {ad.seller.id && (
                <SellerSection onClick={() => navigate(`/user/${ad.seller.id}`)}>
                    {ad.seller.profilePic && <SellerPhoto src={ad.seller.profilePic} alt={ad.seller.name} />}
                    <div>
                        <SellerName>{ad.seller.name}</SellerName>
                        {ad.seller.phone && <p>📞 {ad.seller.phone}</p>}
                    </div>
                </SellerSection>
            )}

            {/* Кнопка чата */}
            <Button onClick={handleChat} disabled={loadingChat}>
                {loadingChat ? 'Загрузка...' : '💬 Чат с продавцом'}
            </Button>
        </Container>
    );
};

export default OneAdPage;
