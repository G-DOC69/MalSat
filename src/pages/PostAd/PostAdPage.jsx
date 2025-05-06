import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postAdRequest } from "../../app/api.js";
import { useCheckUser } from "../../hooks/useCheckUser.js";
import AdForm from "../../components/AdForm/AdForm.jsx";
import PhotoPreviewBlock from "../../components/PhotoPreviewBlock/PhotoPreviewBlock.jsx";
import { Container, FormSection, Title } from "./PostAdPageStyle.js";

const MAX_PHOTOS = 10;

const PostAdPage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("access_token");

    const [formData, setFormData] = useState({
        animal: "",
        breed: "",
        age: "",
        region: "",
        price: "",
        description: "",
        photos: []
    });

    const [previewPhotos, setPreviewPhotos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useCheckUser();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePhotoUpload = (e) => {
        const files = Array.from(e.target.files);
        const remainingSlots = MAX_PHOTOS - formData.photos.length;

        if (files.length > remainingSlots) {
            setError(`Можно добавить только ${remainingSlots} фото.`);
            return;
        }

        const previews = files.map(file => URL.createObjectURL(file));
        setFormData(prev => ({
            ...prev,
            photos: [...prev.photos, ...files]
        }));
        setPreviewPhotos(prev => [...prev, ...previews]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const form = new FormData();
            const adData = {
                animal: formData.animal,
                breed: formData.breed,
                age: formData.age,
                region: formData.region,
                price: formData.price,
                description: formData.description
            };

            form.append("formData", new Blob([JSON.stringify(adData)], { type: "application/json" }));
            formData.photos.forEach(photo => form.append("photos", photo));

            const res = await postAdRequest(token, form);
            if (res.status === 200 || res.status === 201) {
                navigate("/ad/my-ads");
            }
        } catch (err) {
            console.error("Ошибка Создания: ",err);
            setError("Не удалось опубликовать объявление");
        } finally {
            setLoading(false);
        }
    };

    const disablePhotoInput = formData.photos.length >= MAX_PHOTOS;

    return (
        <Container>
            <FormSection>
                <Title>Подать объявление</Title>
                <AdForm
                    formData={formData}
                    handleChange={handleChange}
                    onPhotoChange={handlePhotoUpload}
                    handleSubmit={handleSubmit}
                    loading={loading}
                    error={error}
                    disablePhotoInput={disablePhotoInput}
                    replacePhotos={false}
                    onReplaceModeActivate={null}
                />
                <PhotoPreviewBlock previewPhotos={previewPhotos} />
            </FormSection>
        </Container>
    );
};

export default PostAdPage;
