import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import countryPhoneCodes from '../../app/countryPhoneCodes.jsx';
import { registerUserRequest } from '../../app/api.js';
import {
    RegisterContainer,
    RegisterForm,
    Title,
    Input,
    Select,
    Button,
    ErrorMessage,
    RegisterLinks
} from './RegisterPageStyle';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phoneCode: '+996',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [selectedCode, setSelectedCode] = useState('+996');
    const [phoneError, setPhoneError] = useState('');

    const handlePhoneChange = (e) => {
        const number = e.target.value;
        setFormData(prev => ({
            ...prev,
            phoneNumber: number,
            phoneCode: selectedCode
        }));
        setPhoneError(validatePhoneNumber(selectedCode, number));
    };

    const validateUsername = (username) => /^[A-Za-zА-Яа-яЁё0-9]{1,20}$/.test(username);
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) => /^[A-Za-z\d!?*()]{8,20}$/.test(password);

    const validatePhoneNumber = (code, phoneNumber) => {
        const country = countryPhoneCodes.find(c => c.code === code);
        if (!country) return "Выберите страну";
        const cleaned = phoneNumber.replace(/\D/g, "");
        if (cleaned.length !== country.length) return `Номер должен содержать ${country.length} цифр`;
        return "";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        let error = '';
        if (name === 'username' && !validateUsername(value)) error = 'Имя: до 20 букв и цифр';
        if (name === 'email' && !validateEmail(value)) error = 'Неверный email';
        if (name === 'password' && !validatePassword(value)) error = 'Пароль: 8-20 символов (!?*())';
        if (name === 'confirmPassword' && value !== formData.password) error = 'Пароли не совпадают';

        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleCodeChange = (e) => {
        const code = e.target.value;
        setSelectedCode(code);
        setFormData(prev => ({ ...prev, phoneCode: code }));
        setPhoneError(validatePhoneNumber(code, formData.phoneNumber));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (Object.values(errors).some(Boolean) || phoneError || Object.values(formData).some(v => !v)) {
            setErrorMessage('Пожалуйста, заполните форму корректно');
            return;
        }

        const userPayload = {
            username: formData.username,
            email: formData.email,
            phone: formData.phoneCode + formData.phoneNumber,
            password: formData.password
        };

        try {
            const response = await registerUserRequest(userPayload);
            if (response.status === 200 || response.status === 201) {
                navigate('/login/confirm-email');
            } else {
                setErrorMessage('Ошибка сервера');
            }
        } catch (err) {
            console.log("Response Error: ", err);
            if(response.status===400){
                setErrorMessage('Email уже используется')
            }
            else{setErrorMessage('Ошибка подключения к серверу');}
            
        }
    };

    return (
        <RegisterContainer>
            <RegisterForm onSubmit={handleSubmit}>
                <Title>Регистрация</Title>

                <Input type="text" name="username" placeholder="Имя пользователя" value={formData.username} onChange={handleChange} required />
                {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}

                <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}

                <Select value={selectedCode} onChange={handleCodeChange}>
                    {countryPhoneCodes.map(({ id, country, code }) => (
                        <option key={id} value={code}>{country} ({code})</option>
                    ))}
                </Select>

                <Input type="text" value={formData.phoneNumber} onChange={handlePhoneChange} placeholder="Введите номер" required />
                {phoneError && <ErrorMessage>{phoneError}</ErrorMessage>}

                <Input type="password" name="password" placeholder="Пароль" value={formData.password} onChange={handleChange} required />
                {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}

                <Input type="password" name="confirmPassword" placeholder="Подтвердите пароль" value={formData.confirmPassword} onChange={handleChange} required />
                {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}

                <Button type="submit">Зарегистрироваться</Button>
            </RegisterForm>

            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

            <RegisterLinks>
                <Link to="/login/sign-in">Уже есть аккаунт?</Link>
            </RegisterLinks>
        </RegisterContainer>
    );
};

export default RegisterPage;
