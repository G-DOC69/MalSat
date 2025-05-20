import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 20px;
  max-width: 1200px;
  margin: auto;
  margin-top: 80px;
  position: relative;
  animation: fadeIn 0.4s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: 24px 0 16px;
  color: #1e3a8a;
  text-align: center;
`;

export const AdsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;
