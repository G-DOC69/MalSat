import React from "react";
import {
  FeaturesWrapper,
  FeatureCard,
  FeatureTitle,
  FeatureText
} from "./AdFeaturesStyle";

const features = [
  {
    title: "Проверка",
    text: "Проверка целостности товара перед отправкой"
  },
  {
    title: "Оперативность",
    text: "Быстрое оформление заказа"
  },
  {
    title: "Доставка",
    text: "Курьерская служба осуществляет доставку по всему Кыргызстану"
  },
  {
    title: "100% Безопасная",
    text: "Мы гарантируем безопасную оплату"
  }
];

const AdFeatures = () => (
  <FeaturesWrapper>
    {features.map((f, i) => (
      <FeatureCard key={i}>
        <div>
          <FeatureTitle>{f.title}</FeatureTitle>
          <FeatureText>{f.text}</FeatureText>
        </div>
      </FeatureCard>
    ))}
  </FeaturesWrapper>
);

export default AdFeatures;
