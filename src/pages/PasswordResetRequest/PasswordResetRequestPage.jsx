import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestPasswordReset } from "../../app/api";
import {
    Container,
    Title,
    Label,
    Input,
    Button,
    SuccessMessage
} from "./PasswordResetRequestPageStyle";

const PasswordResetRequestPage = () => {
    const [email, setEmail] = useState('');
    const [messageSent, setMessageSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) return;

        setLoading(true);
        try {
            await requestPasswordReset({ email });
        } catch (err) {
            // silently ignore all errors
        } finally {
            setMessageSent(true);
            setLoading(false);
            setTimeout(() => navigate("/"), 3000);
        }
    };

    return (
        <Container>
            {!messageSent ? (
                <form onSubmit={handleSubmit}>
                    <Title>Восстановление пароля</Title>
                    <Label htmlFor="email">Введите ваш email:</Label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Button type="submit" disabled={loading}>
                        {loading ? "Отправка..." : "Отправить"}
                    </Button>
                </form>
            ) : (
                <SuccessMessage>
                    Если почта существует, ссылка отправлена. Проверьте вашу почту.
                </SuccessMessage>
            )}
        </Container>
    );
};

export default PasswordResetRequestPage;
