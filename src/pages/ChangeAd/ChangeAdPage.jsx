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

                setFormData({
                    animal: ad.animal,
                    breed: ad.breed,
                    age: ad.age,
                    region: ad.region,
                    price: ad.price,
                    description: ad.description,
                    photos: []
                });

                setPreviewPhotos(ad.photoUrls || []);
            } catch (err) {
                if (err.response?.status === 403) {
                    navigate('/');
                    return;
                }
                console.error('Ошибка при загрузке:', err);
                setError('Не удалось загрузить данные.');
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
                setError(null);
                navigate('/ad/my-ads');
            }
        } catch (err) {
            console.error('Ошибка при обновлении:', err);
            setError('Ошибка при сохранении изменений.');
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
