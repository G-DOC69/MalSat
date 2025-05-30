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
import { useSyncUserContext } from "../../hooks/useSyncUserContext.js";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [, setUser] = useContext(UserContext);

  useSyncUserContext();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const { email, password } = formData;
    if (!validateEmail(email)) return setError("Неверный формат email");
    if (!validatePassword(password)) return setError("Пароль должен быть не менее 6 символов");

    try {
      setLoading(true);
      const response = await loginUserRequest(formData);
      if (response.status === 200 && response.data) {
        localStorage.setItem('access_token', response.data);
        setUser(true);
        navigate("/");
      } else {
        setError("Ошибка авторизации");
      }
    } catch (err) {
      const code = err.response?.status;

      switch (code) {
        case 400:
        case 401:
          setError("Неправильный логин или пароль.");
          break;
        case 429:
          setError("Слишком много попыток. Попробуйте позже.");
          break;
        case 500:
          setError("Ошибка сервера. Попробуйте позже.");
          break;
        default:
          setError(err.response?.data || "Неизвестная ошибка.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <Title>Вход</Title>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Пароль"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Загрузка..." : "Войти"}
        </Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <LoginLinks>
          <Link to="/login/forgot-password">Забыли пароль?</Link>
          <Link to="/login/register">Еще нет аккаунта?</Link>
        </LoginLinks>
      </LoginForm>
    </LoginContainer>
  );
};

export default LoginPage;
