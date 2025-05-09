import  { useState } from 'react';
import { deleteAdAdmin } from '../../app/adminApi.js';
import {
    FullViewContainer,
    AdImage,
    AdDetails,
    DetailRow,
    DeleteButton,
    CollapseButton
} from './styles/AdminAdFullViewStyle';

const AdminAdFullView = ({ ad, token }) => {
    const [visible, setVisible] = useState(true);
    const [deleted, setDeleted] = useState(false);

    const handleDelete = async () => {
        await deleteAdAdmin(ad.id, token);
        setDeleted(true);
    };

    if (!visible) return null;
    if (deleted) return <p>Объявление удалено.</p>;

    return (
        <FullViewContainer>
            <CollapseButton onClick={() => setVisible(false)}>Скрыть</CollapseButton>
            <AdImage src={ad.adPhotoUrl || ad.photoUrl} alt="Объявление" />
            <AdDetails>
                <DetailRow><strong>Животное:</strong> {ad.animal}</DetailRow>
                <DetailRow><strong>Порода:</strong> {ad.breed}</DetailRow>
                <DetailRow><strong>Цена:</strong> {ad.price}</DetailRow>
                <DetailRow><strong>Регион:</strong> {ad.region}</DetailRow>
                <DetailRow><strong>Приоритет:</strong> {ad.priority}</DetailRow>
                <DetailRow><strong>Возраст:</strong> {ad.age}</DetailRow>
                <DetailRow><strong>Описание:</strong> {ad.description}</DetailRow>
                <DetailRow><strong>Создано:</strong> {ad.createdAt}</DetailRow>
            </AdDetails>
            <DeleteButton onClick={handleDelete}>Удалить объявление</DeleteButton>
        </FullViewContainer>
    );
};

export default AdminAdFullView;
