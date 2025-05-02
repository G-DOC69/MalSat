import { Container, Message, StyledLink } from "./EmailSentPageStyle";

const EmailSentPage = () => {
    return (
        <Container>
            <Message>Сообщение с подтверждением было отправлено на вашу электронную почту!</Message>
            <StyledLink to="/">Вернуться на Главную Страницу</StyledLink>
        </Container>
    );
};

export default EmailSentPage;
