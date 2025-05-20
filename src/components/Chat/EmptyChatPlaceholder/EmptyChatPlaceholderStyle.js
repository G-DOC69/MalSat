import styled from "styled-components";

export const Placeholder = styled.p`
  text-align: center;
  margin-top: 40px;
  font-size: 1rem;
  color: #64748b;
  animation: fadeIn 0.5s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
