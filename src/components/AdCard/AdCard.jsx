import { useNavigate } from "react-router-dom";
import { AdCardStyled, AdImage, AdTitle, AdText } from "./AdCardStyle";
import { calculateAgeInMonths, calculateAgeInYears } from "../../app/store";
import React from "react";

const AdCard = ({ ad }) => {
    const navigate = useNavigate();
    if (!ad) return null;


    const handleClick = () => {
        navigate(`/ad/${ad.id}`);
    };

    const months = calculateAgeInMonths(ad.age);
    const ageLabel = months < 12 ? `${months} мес.` : calculateAgeInYears(months);

    return (
        <AdCardStyled onClick={handleClick}>
            <AdImage src={ad.photoUrl || "/placeholder.jpg"} alt={ad.breed || "Животное"} />
            <AdTitle>{ad.animal} — {ad.breed}</AdTitle>
            <AdText>Возраст: {ageLabel}</AdText>
            <AdText>Регион: {ad.region}</AdText>
            <AdText>Цена: {ad.price} сом</AdText>
            <AdText>Приоритет: {ad.priority}</AdText>
        </AdCardStyled>
    );
};

export default React.memo(AdCard);
