import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../app/api";
import {
    Container,
    Title,
    Label,
    Input,
    Button,
    ErrorMessage,
    SuccessMessage
} from "./ChangePasswordPageStyle";
import {useCheckUser} from "../../hooks/useCheckUser.js";

const ChangePasswordPage = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const token = localStorage.getItem("access_token");

    useCheckUser()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (newPassword !== confirmPassword) {
            setError("Пароли не совпадают.");
            return;
        }

        try {
            setLoading(true);
            const res = await changePassword(token, currentPassword,newPassword);

            if (res.status === 200) {
                setSuccess(true);
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
                setTimeout(() => {
                    localStorage.removeItem("access_token");
                    navigate("/login");
                }, 2000);
            } else {
                setError("Не удалось изменить пароль.");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Ошибка сервера.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Title>Смена пароля</Title>
            {!success ? (
                <form onSubmit={handleSubmit}>
                    <Label>Текущий пароль:</Label>
                    <Input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                    <Label>Новый пароль:</Label>
                    <Input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <Label>Повторите новый пароль:</Label>
                    <Input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" disabled={loading}>
                        {loading ? "Отправка..." : "Сменить пароль"}
                    </Button>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                </form>
            ) : (
                <SuccessMessage>Пароль успешно изменён. Перенаправление на страницу входа...</SuccessMessage>
            )}
        </Container>
    );
};

export default ChangePasswordPage;
