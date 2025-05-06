import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCheckUser } from "../../hooks/useCheckUser";
import { getUserRequest, updateUserProfileRequest } from "../../app/api";
import {
    FormContainer,
    Title,
    ErrorMessage,
    ForgotPassword
} from "./ChangeProfilePageStyle";
import ProfileForm from "../../components/ProfileForm/ProfileForm";

const ChangeProfilePage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        photo: null
    });

    const [photoPreview, setPhotoPreview] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token');

    useCheckUser();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getUserRequest(token);
                const user = res.data;

                setFormData(prev => ({
                    ...prev,
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    password: ''
                }));

                setPhotoPreview(user.photoUrl);
            } catch (err) {
                console.error("Ошибка при загрузке профиля:", err);
                setError("Ошибка загрузки данных.");
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, photo: file }));
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const data = new FormData();

            const userPayload = {
                username: formData.username,
                email: formData.email,
                phone: formData.phone,
                password: formData.password
            };

            data.append("user", new Blob([JSON.stringify(userPayload)], { type: 'application/json' }));

            if (formData.photo) {
                data.append("photo", formData.photo);
            }

            const res = await updateUserProfileRequest(token, data);
            if (res.status === 200) {
                navigate('/profile');
            }
        } catch (err) {
            console.error("Ошибка при обновлении:", err);
            setError("Ошибка при обновлении профиля.");
        }
    };

    return (
        <FormContainer>
            <Title>Изменение профиля</Title>

            <form onSubmit={handleSubmit}>
                <ProfileForm
                    formData={formData}
                    handleChange={handleChange}
                    handlePhotoChange={handlePhotoChange}
                    photoPreview={photoPreview}
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </form>

            <ForgotPassword>
                Забыли пароль? <Link to="/login/forgot-password">Восстановить</Link>
            </ForgotPassword>
        </FormContainer>
    );
};

export default ChangeProfilePage;
