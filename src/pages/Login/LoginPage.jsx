import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from "../../App";
import { loginUserRequest } from "../../app/api";
import {
    LoginContainer,
    LoginForm,
    Title,
    Input,
    Button,
    ErrorMessage,
    LoginLinks
} from "./LoginPageStyle";

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [, setUser] = useContext(UserContext);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) => password.length >= 6;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const { email, password } = formData;
        if (!validateEmail(email)) return setError("Неверный формат email");
        if (!validatePassword(password)) return setError("Пароль должен быть не менее 6 символов");

        try {
            const response = await loginUserRequest(formData);
            if (response.status === 200 && response.data) {
                localStorage.setItem('access_token', response.data);
                setUser(true);
                navigate("/");
            } else {
                setError("Ошибка авторизации");
            }
        } catch (err) {
            setError(err.response?.data || "Ошибка сервера. Попробуйте позже.");
        }
    };

    return (
        <LoginContainer>
            <LoginForm onSubmit={handleSubmit}>
                <Title>Вход</Title>
                <Input
                    type="email"
                    name="email"
                    placeholder="Адрес Электронной почты"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <Button type="submit">Войти</Button>
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </LoginForm>
            <LoginLinks>
                <Link to='/login/forgot-password'>Забыли пароль?</Link>
                <Link to='/login/register'>Еще нет аккаунта?</Link>
            </LoginLinks>
        </LoginContainer>
    );
};

export default LoginPage;
