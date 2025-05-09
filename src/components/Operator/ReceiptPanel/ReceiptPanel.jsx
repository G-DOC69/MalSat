import  { useState } from 'react';
import {
    getAllReceiptsForOperator,
    confirmReceiptByOperator,
    rejectReceiptByOperator
} from '../../../app/api.js';
import {
    PanelSection,
    PanelTitle,
    FilterSelect,
    ReceiptBox,
    InfoText,
    Photo,
    StatusButton,
    RefreshButton,
    ModalOverlay,
    ModalImage
} from './ReceiptPanelStyle';

const statusLabels = {
    NEW: 'Новое',
    CONFIRMED: 'Подтверждено',
    FRAUDULENT: 'Мошенничество'
};

const priorityLabels = {
    STANDARD: 'Стандартное',
    FEATURED: 'Выделенное',
    PREMIUM: 'Премиум'
};

const ReceiptPanel = ({ receipts: initial, token }) => {
    const [receipts, setReceipts] = useState(initial);
    const [filter, setFilter] = useState('');
    const [modalSrc, setModalSrc] = useState('');

    const handleConfirm = async (id) => {
        try {
            await confirmReceiptByOperator(token, id);
            const res = await getAllReceiptsForOperator(token);
            setReceipts(res.data);
        } catch (err){
            console.error(err);
        }
    };

    const handleReject = async (id) => {
        try {
            await rejectReceiptByOperator(token, id);
            const res = await getAllReceiptsForOperator(token);
            setReceipts(res.data);
        } catch (err){
            console.error(err);
        }
    };

    const handleRefresh = async () => {
        try {
            const res = await getAllReceiptsForOperator(token);
            setReceipts(res.data);
        } catch (err){
            console.error(err);
        }
    };

    const filtered = filter ? receipts.filter(r => r.status === filter) : receipts;

    return (
        <PanelSection>
            <PanelTitle>Квитанции</PanelTitle>
            <FilterSelect onChange={e => setFilter(e.target.value)} value={filter}>
                <option value="">Все</option>
                {Object.keys(statusLabels).map(s => (
                    <option key={s} value={s}>{statusLabels[s]}</option>
                ))}
            </FilterSelect>
            <RefreshButton onClick={handleRefresh}>Обновить</RefreshButton>
            {filtered.map(r => (
                <ReceiptBox key={r.receiptId}>
                    <InfoText>Пользователь: {r.username} ({r.userPhone})</InfoText>
                    <InfoText>Объявление: {r.adTitle} (ID: {r.adId})</InfoText>
                    <InfoText>Приоритет: {priorityLabels[r.requestedPriority]}</InfoText>
                    <InfoText>Дней: {r.durationDays}</InfoText>
                    <InfoText>Статус: {statusLabels[r.status]}</InfoText>
                    <Photo src={r.receiptPhotoUrl} alt="receipt" onClick={() => setModalSrc(r.receiptPhotoUrl)} />
                    <StatusButton onClick={() => handleConfirm(r.receiptId)}>ПОДТВЕРДИТЬ</StatusButton>
                    <StatusButton onClick={() => handleReject(r.receiptId)}>ОТКЛОНИТЬ</StatusButton>
                </ReceiptBox>
            ))}
            {modalSrc && (
                <ModalOverlay onClick={() => setModalSrc('')}>
                    <ModalImage src={modalSrc} />
                </ModalOverlay>
            )}
        </PanelSection>
    );
};

export default ReceiptPanel;
