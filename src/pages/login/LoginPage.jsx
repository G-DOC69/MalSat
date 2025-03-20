import React, { useState, useContext } from 'react';
import { useNavigate ,Link } from 'react-router-dom';
import {UserContext} from "../../App.jsx";
import './LoginPageStyle.css';
import { loginUserRequest} from "../../app/api.js";
import styled from "styled-components";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f4f8;
    flex-direction: column;
`;

const LoginForm = styled.form`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Title = styled.h2`
  text-align: center;
  color: #1e3a8a;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;

  @media (max-width: 600px) {
    padding: 10px;
    font-size: 14px;
  }
`;

const Button = styled.button`
  background: #1e3a8a;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #3b82f6;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin-top: 10px;
`;

const LoginLinks = styled.div`
  margin-top: 12px;
  text-align: center;

  a {
    color: #1e3a8a;
    text-decoration: none;
    font-size: 14px;
    display: block;
    margin: 5px 0;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [, setUser ] = useContext(UserContext);

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePassword = (password) => {
        return /^[A-Za-z\d!?*()]{8,20}$/.test(password);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        let error = '';
        switch (name) {
            case 'username':
                if (!validateEmail(value)) error = 'Неверный формат электронной почты';
                break;
            case 'password':
                if (!validatePassword(value)) error = 'Неверный формат пароля';
                break;
            default:
                break;
        }
        setError(error)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await loginUserRequest(formData);
            if (response.status === 200 && response.data) {
                localStorage.setItem('access_token', response.data)
                setUser(true)
                navigate("/")
            } else {
                setError(response.message || 'Ошибка входа!');
            }
        } catch (err) {
            setError(err.message||'Ошибка сервера! Попробуйте позже.');
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
            </LoginForm>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <LoginLinks>
                <Link to='/login/forgot-password'>Забыли пароль?</Link>
                <Link to='/login/register'>Еще нет аккаунта?</Link>
            </LoginLinks>
        </LoginContainer>
    );
};

export default LoginPage;
