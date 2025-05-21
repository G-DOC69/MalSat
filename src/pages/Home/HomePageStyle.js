import styled from "styled-components";

// Обертка с фоном
export const BackgroundWrapper = styled.div`
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: background-image 1s ease-in-out;
  min-height: 100vh;
  padding-top: 80px;
  padding-bottom: 40px;
`;

// Затемнение
export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.45);
  z-index: 1;
`;

// Контейнер с контентом
export const Container = styled.div`
  width: 100%;
  padding: 20px;
  max-width: 1200px;
  margin: auto;
  margin-top: 80px;
  position: relative;
  z-index: 2;
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
  margin: 24px 0 20px;
  text-align: center;
`;

export const AdsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

export const SectionHighlight = styled.div`
  background-color: #f0f5fa;
  padding: 12px 20px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  margin: 0 auto 24px;
  max-width: fit-content;
`;

export const SpacedTitle = styled(SectionTitle)`
  margin-top: 48px;
`;



