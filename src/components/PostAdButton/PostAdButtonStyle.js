import styled from "styled-components";
import { Link } from "react-router-dom";

export const Button = styled(Link)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  font-size: 38px;
  font-weight: bold;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  transition: transform 0.3s ease, background 0.3s ease;
  z-index: 999;

  &:hover {
    transform: scale(1.1);
    background: linear-gradient(135deg, #059669, #047857);
  }

  @media (max-width: 600px) {
    width: 56px;
    height: 56px;
    font-size: 32px;
    bottom: 20px;
    right: 20px;
  }
`;
