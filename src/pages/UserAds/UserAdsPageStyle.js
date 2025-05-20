import styled from "styled-components";

export const Container = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 100px 16px 32px; /* отступ сверху под фиксированный navbar */
  animation: fadeIn 0.4s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const AdsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
  align-items: stretch;
`;
