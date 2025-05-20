import styled from "styled-components";
import { FaTelegramPlane, FaInstagram, FaFacebookF } from "react-icons/fa";

const FooterContainer = styled.footer`
  width: 100%;
  background: linear-gradient(90deg, #1e3a8a, #3b82f6); /* как navbar */
  color: white;
  padding: 24px 16px;
  text-align: center;
  margin-top: 60px;
`;


const FooterTitle = styled.h4`
  font-size: 18px;
  margin-bottom: 12px;
  font-weight: 600;
`;

const FooterText = styled.p`
  font-size: 14px;
  color: #dbeafe;
  margin-bottom: 16px;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const IconLink = styled.a`
  color: white;
  font-size: 20px;
  transition: color 0.3s ease;

  &:hover {
    color: #93c5fd;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterTitle>О нас</FooterTitle>
      <FooterText>MalSat — площадка для покупки и продажи животных по всему Кыргызстану</FooterText>
      <SocialIcons>
        <IconLink href="https://t.me/yourchannel/linkuello" target="_blank"><FaTelegramPlane /></IconLink>
        <IconLink href="https://www.instagram.com/linkuello/#" target="_blank"><FaInstagram /></IconLink>
        <IconLink href="https://facebook.com/yourpage" target="_blank"><FaFacebookF /></IconLink>
      </SocialIcons>
    </FooterContainer>
  );
};

export default Footer;
