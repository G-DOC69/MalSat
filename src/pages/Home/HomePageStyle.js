import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 2rem 1rem;
  max-width: 1280px;
  margin: 0 auto;
  position: relative;
`;

export const PageTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  color: #1e3a8a;
  text-align: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

export const AdsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.75rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1.2rem;
  }
`;

export const LoadingText = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #64748b;
  padding: 2rem 0;
`;

export const EmptyText = styled.p`
  text-align: center;
  font-size: 1.25rem;
  color: #94a3b8;
  padding: 2rem 0;
`;
