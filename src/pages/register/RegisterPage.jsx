import './RegisterPageStyle.css';
import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import countryPhoneCodes from '../../app/countryPhoneCodes.jsx';
import {registerUserRequest} from "../../app/api.js";
import styled from "styled-components"


const RegisterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #f0f4f8;
    flex-direction: column;
`;

const RegisterForm = styled.form`
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

const Select = styled.select`
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
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

const ErrorMessage = styled.p`
    color: red;
    font-size: 14px;
    margin-top: -10px;
    text-align: left;
`;

const RegisterLinks = styled.div`
  margin-top: 12px;
  text-align: center;

  a {
    color: #1e3a8a;
    text-decoration: none;
    font-size: 14px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

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
    const [selectedCode, setSelectedCode] = useState("+996");
    const [phoneError, setPhoneError] = useState("");

    const handlePhoneChange = (e) => {
        const number = e.target.value;
        setFormData(prevFormData => ({
            ...prevFormData,
            phoneNumber: number
        }));
        setPhoneError(validatePhoneNumber(selectedCode, number));
    };

    const validateUsername = (username) => {
        return /^[A-Za-zА-Яа-яЁё0-9]{1,20}$/.test(username);
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    const validatePhoneNumber = (selectedCode, phoneNumber) => {
        const country = countryPhoneCodes.find(c => c.code === selectedCode);
        if (!country) {
            return "Выберите страну";
        }
        const cleanedNumber = phoneNumber.replace(/\D/g, "");
        if (cleanedNumber.length !== country.length) {
            return `Номер должен содержать ${country.length} цифр`;
        }
        return "";
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
                if (!validateUsername(value)) error = 'Только латинские, кириллические буквы и цифры, без пробелов, до 20 символов';
                break;
            case 'email':
                if (!validateEmail(value)) error = 'Недействительный адрес электронной почты';
                break;
            case 'password':
                if (!validatePassword(value)) error = 'Пароль должен быть 8-20 символов, написан на латинском алфавите (английском), может содержать заглавные, строчные буквы, цифры и спецсимволы (!?*())';
                break;
            case 'confirmPassword':
                if (value !== formData.password) error = 'Пароли не совпадают';
                break;
            default:
                break;
        }
        setErrors({ ...errors, [name]: error });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (Object.values(errors).some(error => error) || Object.values(formData).some(value => !value)) {
            setErrorMessage('Пожалуйста, исправьте ошибки в форме');
            return;
        }

        try {
            const newFormData = {
            ...formData,
            photoUrl: null
            };
            delete newFormData.confirmPassword;
            const response = await registerUserRequest(newFormData);
            console.log(response);
            console.log(formData);
            if (response.status === 200 || response.status === 201) {
                navigate('/login/confirm-email');
            } else {
                setErrorMessage('Ошибка Сервера, Попробуйте Позже!')
            }
        } catch (err) {
            console.log(err);
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

                <Select onChange={(e) => setSelectedCode(e.target.value)}>
                    {countryPhoneCodes.map(({ id, country, code }) => (
                        <option key={id} value={code}>
                            {country} ({code})
                        </option>
                    ))}
                </Select>

                <Input type="text" value={formData.phoneNumber} onChange={handlePhoneChange} placeholder="Введите номер" />
                {phoneError && <ErrorMessage>{phoneError}</ErrorMessage>}

                <Input type="password" name="password" placeholder="Пароль" value={formData.password} onChange={handleChange} required />
                {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}

                <Input type="password" name="confirmPassword" placeholder="Подтвердите пароль" value={formData.confirmPassword} onChange={handleChange} required />
                {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}

                <Button type="submit">Зарегистрироваться</Button>
            </RegisterForm>

            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

            <RegisterLinks>
                <Link to="/login/sign-in">Уже Есть Аккаунт?</Link>
            </RegisterLinks>
        </RegisterContainer>
    );
};

export default RegisterPage;
