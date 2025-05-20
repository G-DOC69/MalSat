import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { confirmEmailRequest } from "../../app/api";
import {
    PageContainer,
    Message,
    StyledLink,
    Subtitle
} from "./ConfirmEmailPageStyle";

const ConfirmEmailPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState("pending");

    useEffect(() => {
        if (!token) {
            navigate("/");
            return;
        }

        const confirmEmail = async () => {
            try {
                const res = await confirmEmailRequest(token);
                setStatus(res.status === 200 ? "success" : "error");
            } catch (err) {
                const code = err.response?.status;

                switch (code) {
                    case 400:
                        console.error("Ссылка недействительна или устарела.");
                        break;
                    case 404:
                        console.error("Пользователь с таким токеном не найден.");
                        break;
                    case 410:
                        console.error("Срок действия ссылки истёк.");
                        break;
                    case 500:
                        console.error("Ошибка сервера при подтверждении аккаунта.");
                        break;
                    default:
                        console.error("Неизвестная ошибка при подтверждении:", err.response?.data?.message || err.message);
                }

                setStatus("error");
            }
        };

        confirmEmail();
    }, [token, navigate]);

    return (
        <PageContainer aria-live="polite">
            {status === "pending" && (
                <Message>Подтверждение аккаунта...</Message>
            )}
            {status === "success" && (
                <>
                    <Message>Аккаунт успешно подтвержден.</Message>
                    <StyledLink to="/login/sign-in">Перейти к входу</StyledLink>
                </>
            )}
            {status === "error" && (
                <>
                    <Message>Не удалось подтвердить аккаунт.</Message>
                    <Subtitle>Попробуйте зарегистрироваться снова или повторить позже.</Subtitle>
                    <StyledLink to="/login/register">Регистрация</StyledLink>
                </>
            )}
        </PageContainer>
    );
};

export default ConfirmEmailPage;
