import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetRequest } from "../../app/api";
import {
    Container,
    Title,
    Label,
    Input,
    Button,
    SuccessMessage,
    ErrorMessage
} from "./PasswordResetRequestPageStyle";

const PasswordResetRequestPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setError(null);

        try {
            const res = await sendPasswordResetRequest({ email });
            if (res.status === 200 || res.status === 201) {
                setMessage('Ссылка для восстановления пароля отправлена на вашу почту.');
                setTimeout(() => navigate('/'), 3000);
            } else {
                setError('Ошибка при отправке запроса.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Нет ответа от сервера.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            {!message && (
                <form onSubmit={handleSubmit}>
                    <Title>Восстановление пароля</Title>
                    <Label>
                        Введите ваш email:
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Label>
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Отправка...' : 'Отправить'}
                    </Button>
                </form>
            )}
            {message && <SuccessMessage>{message}</SuccessMessage>}
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </Container>
    );
};

export default PasswordResetRequestPage;
