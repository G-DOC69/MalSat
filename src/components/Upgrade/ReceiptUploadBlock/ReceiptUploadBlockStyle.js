import styled from 'styled-components';

export const Section = styled.section`
  margin-bottom: 2rem;
`;

export const Title = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e3a8a;
`;

export const QRImage = styled.img`
  display: block;
  width: 100%;
  max-width: 400px;
  margin: 1rem auto;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

export const Disclaimer = styled.p`
  font-size: 0.9rem;
  color: #444;
  margin-top: 1rem;
  line-height: 1.5;
  text-align: center;
`;

export const PriceTag = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 1rem;
  color: #1a202c;
`;

export const UploadInput = styled.input`
  margin-top: 1rem;
  font-size: 0.95rem;
`;

export const SubmitButton = styled.button`
  margin-top: 1rem;
  padding: 0.6rem 1.4rem;
  background: #16a34a;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover:not(:disabled) {
    background: #15803d;
  }

  &:disabled {
    background: #aaa;
    cursor: not-allowed;
  }
`;
