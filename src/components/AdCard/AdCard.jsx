import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AdCardStyled,
  AdImage,
  AdContent,
  AdTitle,
  AdText,
  PriceTag,
  PriorityBadge,
} from "./AdCardStyle";
import { FaFire, FaStar, FaGem } from "react-icons/fa";
import { calculateAgeInMonths, calculateAgeInYears } from "../../app/store";

const AdCard = ({ ad }) => {
  const navigate = useNavigate();
  if (!ad) return null;

  const handleClick = () => {
    navigate(`/ad/${ad.id}`);
  };

  const months = calculateAgeInMonths(ad.age);
  const ageLabel = months < 12 ? `${months} мес.` : calculateAgeInYears(months);

  const getPriorityIcon = (priority) => {
    if (!priority) return null;
    switch (priority.toLowerCase()) {
      case "vip":
        return <FaFire />;
      case "премиум":
        return <FaGem />;
      case "приоритет":
        return <FaStar />;
      default:
        return null;
    }
  };

  return (
    <AdCardStyled onClick={handleClick}>
      <AdImage src={ad.photoUrl || "/placeholder.jpg"} alt={ad.breed || "Животное"} />
      {getPriorityIcon(ad.priority) && (
        <PriorityBadge>{getPriorityIcon(ad.priority)}</PriorityBadge>
      )}
      <AdContent>
        <AdTitle>{ad.animal} — {ad.breed}</AdTitle>
        <AdText>Возраст: {ageLabel}</AdText>
        <AdText>Регион: {ad.region}</AdText>
        <PriceTag>{ad.price} сом</PriceTag>
      </AdContent>
    </AdCardStyled>
  );
};

export default React.memo(AdCard);
