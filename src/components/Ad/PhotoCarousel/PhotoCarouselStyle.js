import styled from "styled-components";

export const CarouselWrapper = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
`;

export const ImageSection = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 16px;
  overflow: hidden;
  background-color: #f1f5f9;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  @media (max-width: 640px) {
    height: 250px;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
  background-color: #e2e8f0;
`;

export const NavButton = styled.button`
  position: absolute;
  top: 50%;
  ${({ position }) => (position === "left" ? "left: 1rem;" : "right: 1rem;")}
  transform: translateY(-50%);
  background-color: rgba(37, 99, 235, 0.7); /* синий #2563eb */
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  font-size: 1.25rem;
  border-radius: 50%;
  cursor: pointer;
  z-index: 2;
  transition: background 0.2s ease;

  &:hover {
    background-color: rgba(37, 99, 235, 0.9);
  }

  @media (max-width: 640px) {
    font-size: 1rem;
    padding: 0.4rem 0.75rem;
  }
`;