import ConfirmForm from '../ConfirmForm/ConfirmForm.jsx';
import {
    ColumnTitle,
    DeliveryCard,
    DeliveryInfo,
    DeliveryLink,
    DeliveryButton,
    DeliveryStatusText,
    RefreshButtonRow
} from './DeliveryColumnStyle';

const statusMap = {
    NEW: 'Новая',
    DENIED: 'Отклонена',
    READY: 'Подтверждена',
    TAKEN: 'Забрана',
    DELIVERED: 'Доставлена',
    CANCELED: 'Отменена'
};

const DeliveryColumn = ({
                            title = '',
                            deliveries = [],
                            isSender = false,
                            onDeny = () => {},
                            onConfirmStart = () => {},
                            confirmingId = null,
                            confirmForm = {},
                            onFormChange = () => {},
                            onPhoneChange = () => {},
                            onCodeChange = () => {},
                            selectedCode = '',
                            phoneError = '',
                            onSubmit = () => {},
                            onRefresh = () => {},
                            loading ,
                        }) => (
    <>
        <RefreshButtonRow>
            <ColumnTitle>{title}</ColumnTitle>
            <DeliveryButton onClick={onRefresh}>Обновить</DeliveryButton>
        </RefreshButtonRow>
        {deliveries.map((d = {}) => (
            <DeliveryCard key={d.deliveryId || Math.random()}>
                <DeliveryInfo>{d.adAnimal || 'Животное неизвестно'} - {d.adBreed || 'Порода неизвестна'}</DeliveryInfo>
                <DeliveryLink to={`/ad/${d.adId || ''}`}>Перейти к объявлению</DeliveryLink>
                {isSender ? (
                    <>
                        <DeliveryButton onClick={() => onDeny(d.deliveryId)} disabled={loading}>Отклонить</DeliveryButton>
                        <DeliveryButton onClick={() => onConfirmStart(d.deliveryId)} disabled={loading}>Подтвердить</DeliveryButton>
                        {confirmingId === d.deliveryId && (
                            <ConfirmForm
                                confirmForm={confirmForm}
                                onFormChange={onFormChange}
                                onPhoneChange={onPhoneChange}
                                onCodeChange={onCodeChange}
                                selectedCode={selectedCode}
                                phoneError={phoneError}
                                onSubmit={onSubmit}
                            />
                        )}
                    </>
                ) : (
                    <DeliveryStatusText>Статус: {statusMap[d.status] || 'Неизвестен'}</DeliveryStatusText>
                )}
            </DeliveryCard>
        ))}
    </>
);

export default DeliveryColumn;
