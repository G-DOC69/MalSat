import './ChangeProfilePageStyle.css'
import { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useCheckUser} from "../../hooks/useCheckUser.js";
import {updateUserProfileR} from "../../app/tempApi.js";

const ChangeProfilePage = ({ user }) => {
    const [formData, setFormData] = useState({
        username: '',
        photo: null,
        phone: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useCheckUser()

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || 'exampleUserName',
                photo: user.photo  || 'examplePhoto',
                phone: user.phone || '+996999999999',
                password: ''
            });
        }
    }, [user]);

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
            const response = await updateUserProfileR(token,formData);
            if (response.status === 200 || response.status === 201) {
                navigate('/profile');
            }
        } catch (err) {
            setError(err.message || 'Ошибка обновления профиля');
        }
    };

    return (
        <div>
            <h2>Изменение профиля</h2>
            <form onSubmit={handleSubmit}>
                <label>Имя пользователя:</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <label>Фото профиля:</label>
                <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleChange}
                />
                <label>Номер телефона:</label>
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <label>Пароль (для подтверждения):</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Сохранить изменения</button>
            </form>
            {error && <div className="error-message">{error}</div>}
            <p>Забыли пароль? <Link href="/login/forgot-password">Восстановить</Link></p>
        </div>
    );
};

export default ChangeProfilePage;
