import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCheckUser } from '../../hooks/useCheckUser';
import {
    getUserRequest,
    updateUserProfileRequest
} from '../../app/api';
import countryPhoneCodes from '../../app/countryPhoneCodes';
import {
    FormContainer,
    Title,
    ErrorMessage,
    ForgotPassword
} from './ChangeProfilePageStyle';
import ProfileForm from '../../components/ProfileForm/ProfileForm';

const ChangeProfilePage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phoneCode: '+996',
        phoneNumber: '',
        password: '',
        photo: null
    });
    const [photoPreview, setPhotoPreview] = useState(null);
    const [selectedCode, setSelectedCode] = useState('+996');
    const [phoneError, setPhoneError] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const token = localStorage.getItem('access_token');

    useCheckUser();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getUserRequest(token);
                const user = res.data;

                const code = countryPhoneCodes.find(c => user.phone.startsWith(c.code))?.code || '+996';
                const number = user.phone.replace(code, '');

                setFormData(prev => ({
                    ...prev,
                    username: user.username,
                    email: user.email,
                    phoneCode: code,
                    phoneNumber: number,
                    password: ''
                }));

                setSelectedCode(code);
                setPhotoPreview(user.photoUrl);
            } catch (err) {
                const code = err.response?.status;

                if (code === 401) {
                    localStorage.removeItem("access_token");
                    navigate("/");
                    return;
                }

                switch (code) {
                    case 403:
                        setError("Доступ запрещён.");
                        break;
                    case 404:
                        setError("Пользователь не найден.");
                        break;
                    case 500:
                        setError("Ошибка сервера при загрузке профиля.");
                        break;
                    default:
                        setError(err.response?.data?.message || "Ошибка загрузки данных.");
                }
            }
        };

        fetchData();
    }, [token]);


    const validatePhoneNumber = (code, phoneNumber) => {
        const country = countryPhoneCodes.find(c => c.code === code);
        if (!country) return "Выберите страну";
        const cleaned = phoneNumber.replace(/\D/g, "");
        if (cleaned.length !== country.length) return `Номер должен содержать ${country.length} цифр`;
        return "";
    };

    const handlePhoneChange = (e) => {
        const number = e.target.value;
        setFormData(prev => ({
            ...prev,
            phoneNumber: number,
            phoneCode: selectedCode
        }));
        setPhoneError(validatePhoneNumber(selectedCode, number));
        setError('');
    };

    const handleCodeChange = (e) => {
        const code = e.target.value;
        setSelectedCode(code);
        setFormData(prev => ({ ...prev, phoneCode: code }));
        setPhoneError(validatePhoneNumber(code, formData.phoneNumber));
        setError('');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Допустимы только изображения.');
                return;
            }
            setFormData(prev => ({ ...prev, photo: file }));
            setPhotoPreview(URL.createObjectURL(file));
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (phoneError) {
            setError(phoneError);
            return;
        }

        try {
            setLoading(true);
            const data = new FormData();

            const userPayload = {
                username: formData.username,
                email: formData.email,
                phone: formData.phoneCode + formData.phoneNumber,
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
            const code = err.response?.status;

            if (code === 401) {
                localStorage.removeItem("access_token");
                navigate("/");
                return;
            }

            switch (code) {
                case 403:
                    setError("Неверный пароль.");
                    break;
                case 404:
                    setError("Пользователь не найден.");
                    break;
                case 500:
                    setError("Ошибка сервера при обновлении профиля.");
                    break;
                default:
                    setError(err.response?.data?.message || "Неизвестная ошибка.");
            }
        } finally {
            setLoading(false);
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
                    loading={loading}
                    selectedCode={selectedCode}
                    handleCodeChange={handleCodeChange}
                    handlePhoneChange={handlePhoneChange}
                    phoneError={phoneError}
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
