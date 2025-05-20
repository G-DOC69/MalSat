import styled from "styled-components";

export const PaginationStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
  flex-wrap: wrap;
`;

export const PageButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${({ disabled }) => (disabled ? "#e5e7eb" : "#1e3a8a")};
  color: ${({ disabled }) => (disabled ? "#9ca3af" : "white")};
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background 0.3s ease;

  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? "#e5e7eb" : "#374fc2"};
  }
`;

export const PageInfo = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: #334155;
`;
