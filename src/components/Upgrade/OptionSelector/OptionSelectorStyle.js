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

export const Select = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const OptionButton = styled.button`
  padding: 0.6rem 1.2rem;
  background: #0077cc;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover:not(:disabled) {
    background: #005fa3;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;
