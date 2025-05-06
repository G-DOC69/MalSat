import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { confirmEmailRequest } from "../../app/api";
import { PageContainer, Message, StyledLink, Subtitle } from "./ConfirmEmailPageStyle";

const ConfirmEmailPage = () => {
    const { token } = useParams();
    const [status, setStatus] = useState("pending");

    useEffect(() => {
        const confirmEmail = async () => {
            try {
                const res = await confirmEmailRequest(token);
                setStatus(res.status === 200 ? "success" : "error");
            } catch {
                setStatus("error");
            }
        };
        confirmEmail();
    }, [token]);

    if (status === "pending") {
        return (
            <PageContainer>
                <Message>Подтверждение аккаунта...</Message>
            </PageContainer>
        );
    }

    if (status === "success") {
        return (
            <PageContainer>
                <Message>Аккаунт успешно подтвержден.</Message>
                <StyledLink to="/login/sign-in">Перейти к входу</StyledLink>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <Message>Не удалось подтвердить аккаунт.</Message>
            <Subtitle>Попробуйте зарегистрироваться снова или повторить позже.</Subtitle>
            <StyledLink to="/login/register">Регистрация</StyledLink>
        </PageContainer>
    );
};

export default ConfirmEmailPage;
