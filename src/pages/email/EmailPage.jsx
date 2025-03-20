import React from 'react';
import './EmailPageStyle.css'
import {Link} from "react-router-dom";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
  padding: 20px;
  font-size: clamp(16px, 2vw, 24px);
`;

const StyledLink = styled(Link)`
  margin-top: 15px;
  font-size: clamp(14px, 1.5vw, 20px);
  color: #1e3a8a;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const EmailPage = () => {
    return (
        <Container>
            Сообщение с подтверждением было отправлено на вашу электронную почту!
            <StyledLink to="/">Вернуться на Главную Страницу</StyledLink>
        </Container>
    );
};

export default EmailPage;
