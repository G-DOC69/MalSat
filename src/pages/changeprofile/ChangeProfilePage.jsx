import './ChangeProfilePageStyle.css'
import { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useCheckUser} from "../../hooks/useCheckUser.js";
import {getUserRequest, updateUserProfileRequest} from "../../app/api.js";
import styled from "styled-components";

const FormContainer = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #1e3a8a;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  text-align: left;
  font-size: 14px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border-color: #1e3a8a;
    outline: none;
  }
`;

const ProfilePhotoPreview = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin: 10px auto;
  display: block;
`;

const SubmitButton = styled.button`
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
  font-size: 14px;
  margin-top: 10px;
`;

const ForgotPassword = styled.p`
  font-size: 14px;
  margin-top: 10px;
  
  a {
    color: #1e3a8a;
    text-decoration: none;
    font-weight: bold;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ChangeProfilePage = () => {
    const [formData, setFormData] = useState({
        username: '',
        photoUrl: null,
        email:'',
        phone: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [photoPreview,setPhotoPreview]=useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token');

    useCheckUser()

    useEffect( () => {
        const fetchData = async () => {
            const response = await getUserRequest(token)
            {response &&(
                setFormData({
                    username: response.data.username,
                    photoUrl: response.data.photoUrl,
                    email: response.data.email,
                    phone: response.data.phone,
                    password: ''
                })
            )}
            {!response &&(
                setFormData({
                    username:'exampleUserName',
                    photoUrl:null,
                    email:'example@gmail.com',
                    phone:'+996999999999',
                    password: ''
                })
            )}
        }
        fetchData()
    }, []);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const updatedFormData = {
                ...formData,
                photoUrl: null
            };
            const response = await updateUserProfileRequest(token,updatedFormData);
            if (response.status === 200 || response.status === 201) {
                navigate('/profile');
            }
        } catch (err) {
            setError(err.message || 'Ошибка обновления профиля');
        }
    };
    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPhotoPreview(URL.createObjectURL(file));
            handleChange(event);
        }
    };
    return (
        <FormContainer>
            <Title>Изменение профиля</Title>
            <Form onSubmit={handleSubmit}>
                <Label>Имя пользователя:</Label>
                <Input type="text" name="username" value={formData.username} onChange={handleChange} required />

                <Label>Фото профиля:</Label>
                {photoPreview && <ProfilePhotoPreview src={null} alt="Profile preview" />}
                <Input type="file" name="photo" accept="image/*" onChange={handlePhotoChange} />

                <Label>Адрес Электронной почты:</Label>
                <Input type="email" name="email" value={formData.email} onChange={handleChange} required />

                <Label>Номер телефона:</Label>
                <Input type="text" name="phone" value={formData.phone} onChange={handleChange} required />

                <Label>Пароль (для подтверждения):</Label>
                <Input type="password" name="password" value={formData.password} onChange={handleChange} required />

                <SubmitButton type="submit">Сохранить изменения</SubmitButton>
            </Form>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <ForgotPassword>
                Забыли пароль? <a href="/login/forgot-password">Восстановить</a>
            </ForgotPassword>
        </FormContainer>
    );
};

export default ChangeProfilePage;
