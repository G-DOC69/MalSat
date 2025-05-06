import { useState } from "react";
import {useSearchParams, useNavigate, useParams} from "react-router-dom";
import { resetPasswordRequest } from "../../app/api";
import {
    Container,
    Title,
    Label,
    Input,
    Button,
    ErrorMessage,
    SuccessMessage
} from "./PasswordResetPageStyle";

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

        if (newPassword !== confirmPassword) {
            setError("Пароли не совпадают.");
            return;
        }

        try {
            setLoading(true);
            const res = await resetPasswordRequest({ token, newPassword });
            if (res.status === 200) {
                setSuccess(true);
                setTimeout(() => navigate("/login"), 3000);
            } else {
                setError("Не удалось сбросить пароль.");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Ошибка сервера.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Title>Сброс пароля</Title>
            {!success ? (
                <form onSubmit={handleSubmit}>
                    <Label>Новый пароль:</Label>
                    <Input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <Label>Повторите пароль:</Label>
                    <Input
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
