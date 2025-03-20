import './ChangeAdPageStyle.css'
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {getAnimalsListR} from "../../app/tempApi.js";
import {useCheckUser} from "../../hooks/useCheckUser.js";
import {getAdRequest, updateAdRequest} from "../../app/api.js";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  max-width: 800px;
  margin: auto;
`;

const FormSection = styled.div`
  flex: 1;
  min-width: 300px;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #1e3a8a;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  min-height: 80px;
`;

const Button = styled.button`
  background: #1e3a8a;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
  width: 100%;

  &:hover {
    background: #3b82f6;
  }
`;

const PhotoSection = styled.div`
  flex: 1;
  min-width: 300px;
  text-align: center;
`;

const PhotoPreview = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  justify-content: center;
`;

const Photo = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`;


const ChangeAdPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        animal: '',
        breed: '',
        age: '',
        price: '',
        description: '',
        seller:{
            id:'',
            name:'',
            phone:'',
            profilePic:'',
        },
        photos: [],
    });
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('access_token');
    const [previewPhotos,setPreviewPhotos]=useState([]);

    useCheckUser()

    const onPhotoChange = (event) => {
        const files = Array.from(event.target.files);
        const previews = files.map(file => URL.createObjectURL(file));
        setPreviewPhotos([...previewPhotos, ...previews]);
        handlePhotoUpload(event);
    };

    useEffect(() => {
        const fetchAdData = async () => {
            try {
                const adData = await getAdRequest(id,token);
                let animalsList = await getAnimalsListR(token);
                setAnimals(animalsList.data);
                setFormData({
                    animal: adData.data.animal,
                    breed: adData.data.breed,
                    age: adData.data.age,
                    price: adData.data.price,
                    description: adData.data.description,
                    seller:adData.data.seller,
                    photos: adData.data.photos,
                });
            } catch (err) {
                setError(err||'Ошибка загрузки объявления.');
            }
        };
        fetchAdData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // const handlePhotoUpload = (e) => {
    //     const files = Array.from(e.target.files);
    //     if (files.length + formData.photos.length > 10) {
    //         setError('Максимум 10 фото!');
    //         return;
    //     }
    //     setFormData((prev) => ({ ...prev, photos: [...prev.photos, ...files] }));
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await updateAdRequest(id,token, formData);
            if (response.status === 200 || response.status === 201) {
                navigate('/ad/my-ads');
            }
            // eslint-disable-next-line no-unused-vars
        } catch (err) {
            setError('Ошибка обновления объявления.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            {/* Форма редактирования */}
            <FormSection>
                <Title>Редактировать объявление</Title>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <Label>
                        Животное:
                        <select name="animal" value={formData.animal} onChange={handleChange} required>
                            {animals.map((animal) => (
                                <option key={animal} value={animal}>{animal}</option>
                            ))}
                        </select>
                    </Label>

                    <Label>
                        Порода:
                        <Input name="breed" value={formData.breed} onChange={handleChange} required/>
                    </Label>

                    <Label>
                        Возраст:
                        <Input type="date" name="age" value={formData.age} onChange={handleChange} required />
                    </Label>

                    <Label>
                        Цена (KGS):
                        <Input type="number" name="price" value={formData.price} onChange={handleChange} required />
                    </Label>

                    <Label>
                        Описание:
                        <TextArea name="description" value={formData.description} onChange={handleChange} maxLength="2000" required />
                    </Label>

                    <Label>
                        Фото (макс. 10):
                        <Input type="file" multiple accept="image/*" onChange={onPhotoChange} />
                    </Label>

                    <Button type="submit" disabled={loading}>{loading ? 'Загрузка...' : 'Сохранить изменения'}</Button>
                </form>
            </FormSection>

            {/* Превью фото */}
            <PhotoSection>
                <h3>Текущие и новые фото</h3>
                <PhotoPreview>
                    {previewPhotos.length > 0 ? (
                        previewPhotos.map((src, index) => <Photo key={index} src={src} alt="Preview" />)
                    ) : (
                        <p>Фото еще не загружены</p>
                    )}
                </PhotoPreview>
            </PhotoSection>
        </Container>
    );
};

export default ChangeAdPage;
