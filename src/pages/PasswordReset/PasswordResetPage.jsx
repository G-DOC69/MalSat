import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../app/api";
import {
    Container,
    Title,
    Label,
    Input,
    Button,
    ErrorMessage,
    SuccessMessage
} from "./PasswordResetPageStyle";

const validatePassword = (password) => /^[A-Za-z\d!?*()]{8,20}$/.test(password);

const PasswordResetPage = () => {
    const navigate = useNavigate();
    const { token } = useParams();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!token) {
            setError("Неверная или устаревшая ссылка.");
            return;
        }

        if (!validatePassword(newPassword)) {
            setError("Пароль должен содержать 8-20 символов и только латинские буквы, цифры или !?*().");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Пароли не совпадают.");
            return;
        }

        try {
            setLoading(true);
            const res = await resetPassword( token, newPassword);
            if (res.status === 200) {
                setSuccess(true);
                setTimeout(() => navigate("/login"), 3000);
            } else {
                setError("Не удалось сбросить пароль.");
            }
        } catch (err) {
            const code = err.response?.status;

            switch (code) {
                case 400:
                    setError("Некорректный запрос. Проверьте данные.");
                    break;
                case 401:
                case 410:
                    setError("Срок действия ссылки истёк или она недействительна.");
                    break;
                case 500:
                    setError("Ошибка сервера. Попробуйте позже.");
                    break;
                default:
                    setError(err.response?.data?.message || "Неизвестная ошибка.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Title>Сброс пароля</Title>
            {!success ? (
                <form onSubmit={handleSubmit}>
                    <Label htmlFor="newPassword">Новый пароль:</Label>
                    <Input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <Label htmlFor="confirmPassword">Повторите пароль:</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" disabled={loading}>
                        {loading ? "Отправка..." : "Сбросить пароль"}
                    </Button>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                </form>
            ) : (
                <SuccessMessage>Пароль успешно обновлён. Переход к входу...</SuccessMessage>
            )}
        </Container>
    );
};

export default PasswordResetPage;
