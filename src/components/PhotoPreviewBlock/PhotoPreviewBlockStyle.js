import styled from "styled-components";

export const PreviewContainer = styled.div`
  margin-top: 28px;
  padding: 12px 16px;
  background: #f9fafb;
  border-radius: 16px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
  animation: fadeIn 0.4s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const Title = styled.h3`
  text-align: center;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
`;

export const PreviewImage = styled.img`
  width: 88px;
  height: 88px;
  object-fit: cover;
  border-radius: 10px;
  margin: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;
