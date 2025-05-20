import styled from "styled-components";

export const FeaturesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
  padding: 16px;
  background: #f1f5f9;
  border-radius: 12px;
`;

export const FeatureCard = styled.div`
  background: white;
  padding: 16px;
  border-radius: 12px;
  display: flex;
  align-items: flex-start;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

export const FeatureTitle = styled.h4`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 4px;
  color: #0f172a;
`;

export const FeatureText = styled.p`
  font-size: 14px;
  color: #475569;
`;
