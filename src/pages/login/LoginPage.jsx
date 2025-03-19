import React, { useState, useContext } from 'react';
import { useNavigate ,Link } from 'react-router-dom';
import {UserContext} from "../../App.jsx";
import './LoginPageStyle.css';
import { loginUserRequest} from "../../app/api.js";

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
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Вход</h2>
                <input type="email" name="email" placeholder="Адрес Электронной почты" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Пароль" value={formData.password} onChange={handleChange} required />
                <button type="submit">Войти</button>
            </form>
            {error && <div className="error-message">{error}</div>}
            <div className="login-links">
                <Link to='login/forgot-password'>Забыли пароль?</Link>
                <Link to='/login/register'>Еще нет аккаунта?</Link>
            </div>
        </div>
    );
};

export default LoginPage;
