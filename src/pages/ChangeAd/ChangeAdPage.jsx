import './ChangeAdPageStyle';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAdRequest, updateAdRequest } from '../../app/api';
import { useCheckUser } from '../../hooks/useCheckUser';
import {
    Container,
    FormSection,
    Title
} from './ChangeAdPageStyle';
import AdForm from '../../components/AdForm/AdForm';
import PhotoPreviewBlock from '../../components/PhotoPreviewBlock/PhotoPreviewBlock';

const MAX_PHOTOS = 10;

const ChangeAdPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token');

    const [formData, setFormData] = useState({
        animal: '',
        breed: '',
        age: '',
        region: '',
        price: '',
        description: '',
        photos: []
    });

    const [previewPhotos, setPreviewPhotos] = useState([]);
    const [replacePhotos, setReplacePhotos] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useCheckUser();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getAdRequest(id, token);
                const ad = res.data;

                if (!ad) throw new Error('Объявление не найдено');

                const formatDateArray = (arr) => {
                    if (!Array.isArray(arr) || arr.length !== 3) return '';
                    const [year, month, day] = arr;
                    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                };

                setFormData({
                    animal: ad.animal || '',
                    breed: ad.breed || '',
                    age: formatDateArray(ad.age),
                    region: ad.region || '',
                    price: ad.price || '',
                    description: ad.description || '',
                    photos: []
                });

                setPreviewPhotos(ad.photoUrls || []);
            } catch (err) {
                const code = err.response?.status;

                if (code === 401) {
                    localStorage.removeItem('access_token');
                    navigate('/');
                    return;
                }

                if (code === 403) {
                    navigate('/');
                    return;
                }

                switch (code) {
                    case 400:
                        setError("Некорректный запрос. Проверьте параметры.");
                        break;
                    case 404:
                        setError("Объявление не найдено.");
                        break;
                    case 500:
                        setError("Ошибка сервера при загрузке объявления.");
                        break;
                    default:
                        setError(err.response?.data?.message || "Ошибка при загрузке данных.");
                }
            }

        };

        fetchData();
    }, [id, token, navigate]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePhotoChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const totalExisting = replacePhotos ? 0 : previewPhotos.length;
        const remainingSlots = MAX_PHOTOS - totalExisting;

        if (files.length > remainingSlots) {
            setError(`Можно добавить только ${remainingSlots} фото.`);
            return;
        }

        const previews = files.map(file => URL.createObjectURL(file));

        setFormData(prev => ({ ...prev, photos: [...prev.photos, ...files] }));
        setPreviewPhotos(prev =>
            replacePhotos ? previews : [...prev, ...previews]
        );
    };

    const activateReplaceMode = () => {
        setReplacePhotos(true);
        setFormData(prev => ({ ...prev, photos: [] }));
        setPreviewPhotos([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = new FormData();
            data.append('formData', JSON.stringify({
                animal: formData.animal,
                breed: formData.breed,
                age: formData.age,
                region: formData.region,
                price: formData.price,
                description: formData.description
            }));
            data.append('replacePhotos', replacePhotos);

            if (formData.photos.length > 0) {
                formData.photos.forEach(file => {
                    data.append('photos', file);
                });
            }

            const res = await updateAdRequest(id, token, data);
            if (res.status === 200) {
                navigate('/ad/my-ads');
            }
        } catch (err) {
            const code = err.response?.status;

            if (code === 401) {
                localStorage.removeItem('access_token');
                navigate('/');
                return;
            }

            switch (code) {
                case 400:
                    setError("Некорректные данные. Проверьте форму.");
                    break;
                case 403:
                    navigate('/');
                    break;
                case 404:
                    setError("Объявление для обновления не найдено.");
                    break;
                case 500:
                    setError("Внутренняя ошибка сервера. Повторите позже.");
                    break;
                default:
                    setError(err.response?.data?.message || "Неизвестная ошибка.");
            }
        } finally {
            setLoading(false);
        }
    };


    const disablePhotoInput = !replacePhotos && previewPhotos.length >= MAX_PHOTOS;

    return (
        <Container>
            <FormSection>
                <Title>Редактировать объявление</Title>
                <AdForm
                    formData={formData}
                    handleChange={handleChange}
                    onPhotoChange={handlePhotoChange}
                    handleSubmit={handleSubmit}
                    loading={loading}
                    error={error}
                    disablePhotoInput={disablePhotoInput}
                    replacePhotos={replacePhotos}
                    onReplaceModeActivate={replacePhotos ? null : activateReplaceMode}
                />
                <PhotoPreviewBlock previewPhotos={previewPhotos} />
            </FormSection>
        </Container>
    );
};

export default ChangeAdPage;
