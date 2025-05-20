import styled from 'styled-components';

export const PreviewContainer = styled.div`
  margin-top: 2rem;
`;

export const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1e293b;
`;

export const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.03);
  }
`;
