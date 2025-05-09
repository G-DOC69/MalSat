import  { useState } from 'react';
import {
    updateDeliveryStatusByOperator,
    getAllDeliveriesForOperator
} from '../../../app/api.js';
import {
    PanelSection,
    PanelTitle,
    FilterSelect,
    DeliveryBox,
    InfoText,
    StatusButton,
    RefreshButton
} from './DeliveryPanelStyle';

const statusLabels = {
    NEW: 'Новая',
    READY: 'Готова',
    TAKEN: 'Забрана',
    DELIVERED: 'Доставлена',
    CANCELED: 'Отменена',
    DENIED: 'Отклонена'
};

const DeliveryPanel = ({ deliveries: initial, token }) => {
    const [deliveries, setDeliveries] = useState(initial);
    const [filter, setFilter] = useState('');

    const handleStatusChange = async (id, status) => {
        try {
            await updateDeliveryStatusByOperator(token, id, status);
            const res = await getAllDeliveriesForOperator(token);
            setDeliveries(res.data);
        } catch (err){
            console.error(err);
        }
    };

    const handleRefresh = async () => {
        try {
            const res = await getAllDeliveriesForOperator(token);
            setDeliveries(res.data);
        } catch (err){
            console.error(err);
        }
    };

    const filtered = filter ? deliveries.filter(d => d.status === filter) : deliveries;

    return (
        <PanelSection>
            <PanelTitle>Доставки</PanelTitle>
            <FilterSelect onChange={e => setFilter(e.target.value)} value={filter}>
                <option value="">Все</option>
                {Object.keys(statusLabels).map(s => (
                    <option key={s} value={s}>{statusLabels[s]}</option>
                ))}
            </FilterSelect>
            <RefreshButton onClick={handleRefresh}>Обновить</RefreshButton>
            {filtered.map(d => (
                <DeliveryBox key={d.deliveryId}>
                    <InfoText>{d.adAnimal} - {d.adBreed}</InfoText>
                    <InfoText>Покупатель: {d.buyerName}, {d.buyerPhone}, {d.buyerAddress}</InfoText>
                    <InfoText>Продавец: {d.sellerName}, {d.sellerPhone}, {d.sellerAddress}</InfoText>
                    <InfoText>Статус: {statusLabels[d.status]}</InfoText>
                    <StatusButton onClick={() => handleStatusChange(d.deliveryId, 'TAKEN')}>TAKEN</StatusButton>
                    <StatusButton onClick={() => handleStatusChange(d.deliveryId, 'DELIVERED')}>DELIVERED</StatusButton>
                    <StatusButton onClick={() => handleStatusChange(d.deliveryId, 'CANCELED')}>CANCELED</StatusButton>
                </DeliveryBox>
            ))}
        </PanelSection>
    );
};

export default DeliveryPanel;
