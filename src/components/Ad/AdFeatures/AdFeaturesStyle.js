import styled from "styled-components";

export const FeaturesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
  padding: 20px;
  background: #f1f5f9;
  border-radius: 12px;
`;

export const FeatureCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 140px;
  max-width: 280px;
  text-align: center;
`;

export const FeatureTitle = styled.h4`
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
`;


export const FeatureText = styled.p`
  font-size: 15px;
  color: #334155;
  margin: 0;
`;
