import { useEffect, useState } from 'react';
import { getDeliveriesRequestedBy, getDeliveriesRequestedFrom, denyDeliveryRequest, confirmDeliveryRequest } from '../../app/api';
import { useCheckUser } from '../../hooks/useCheckUser';
import { Container, Column, ErrorMessage } from './DeliveryPageStyle';
import DeliveryColumn from "../../components/Delivery/DeliveryColumn/DeliveryColumn.jsx";
import countryPhoneCodes from '../../app/countryPhoneCodes';

const DeliveryPage = () => {
    const token = localStorage.getItem('access_token');
    const [requestedFrom, setRequestedFrom] = useState([]);
    const [requestedBy, setRequestedBy] = useState([]);
    const [confirmingId, setConfirmingId] = useState(null);
    const [confirmForm, setConfirmForm] = useState({ phoneNumber: '', address: '' });
    const [selectedCode, setSelectedCode] = useState('+996');
    const [phoneError, setPhoneError] = useState('');
    const [error, setError] = useState(null);
    const [loading , setLoading] = useState(false);

    useCheckUser();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const from = await getDeliveriesRequestedFrom(token);
                const by = await getDeliveriesRequestedBy(token);
                setRequestedFrom(from.data);
                setRequestedBy(by.data);
            } catch (err) {
                console.error(err)
                setError('Ошибка при загрузке данных');
            } finally {
                setLoading(false)
            }
        };
        fetchData();
    }, []);

    const validatePhoneNumber = (code, phoneNumber) => {
        const country = countryPhoneCodes.find(c => c.code === code);
        if (!country) return "Выберите страну";
        const cleaned = phoneNumber.replace(/\D/g, "");
        if (cleaned.length !== country.length) return `Номер должен содержать ${country.length} цифр`;
        return "";
    };

    const handlePhoneChange = (e) => {
        const number = e.target.value;
        setConfirmForm(prev => ({ ...prev, phoneNumber: number }));
        setPhoneError(validatePhoneNumber(selectedCode, number));
    };

    const handleCodeChange = (e) => {
        const code = e.target.value;
        setSelectedCode(code);
        setPhoneError(validatePhoneNumber(code, confirmForm.phoneNumber));
    };

    const handleConfirmSubmit = async (e) => {
        e.preventDefault();
        const error = validatePhoneNumber(selectedCode, confirmForm.phoneNumber);
        if (error) {
            setPhoneError(error);
            return;
        }
        try {
            setLoading(true)
            await confirmDeliveryRequest(token, {
                deliveryId: confirmingId,
                phone: selectedCode + confirmForm.phoneNumber,
                address: confirmForm.address
            });
            setRequestedFrom(prev =>
                prev.map(d => d.deliveryId === confirmingId ? { ...d, status: 'READY' } : d)
            );
            setConfirmingId(null);
            setTimeout(() => setPhoneError(''), 100);
            setConfirmForm({ phoneNumber: '', address: '' });
        } catch (err) {
            console.error(err)
            setError('Ошибка при подтверждении');
        } finally {
            setLoading(false)
        }
    };

    const handleDeny = async (deliveryId) => {
        try {
            await denyDeliveryRequest(token, deliveryId);
            setRequestedFrom(prev => prev.filter(d => d.deliveryId !== deliveryId));
        } catch {
            setError('Ошибка при отклонении');
        }
    };

    const refetchRequestedFrom = async () => {
        try {
            setLoading(true)
            const from = await getDeliveriesRequestedFrom(token);
            setRequestedFrom(from.data);
        } catch {
            setError('Ошибка при обновлении данных (вам)');
        } finally {
            setLoading(false)
        }
    };

    const refetchRequestedBy = async () => {
        try {
            setLoading(true)
            const by = await getDeliveriesRequestedBy(token);
            setRequestedBy(by.data);
        } catch {
            setError('Ошибка при обновлении данных (от вас)');
        } finally {
            setLoading(false)
        }
    };

    return (
        <Container>
            <Column>
                <DeliveryColumn
                    title="Заявки на доставку (вам)"
                    deliveries={requestedFrom}
                    isSender={true}
                    onDeny={handleDeny}
                    onConfirmStart={setConfirmingId}
                    confirmingId={confirmingId}
                    confirmForm={confirmForm}
                    onFormChange={setConfirmForm}
                    onPhoneChange={handlePhoneChange}
                    onCodeChange={handleCodeChange}
                    selectedCode={selectedCode}
                    phoneError={phoneError}
                    onSubmit={handleConfirmSubmit}
                    onRefresh={refetchRequestedFrom}
                    loading={loading}
                />
            </Column>
            <Column>
                <DeliveryColumn
                    title="Ваши заявки"
                    deliveries={requestedBy}
                    isSender={false}
                    onRefresh={refetchRequestedBy}
                    loading={loading}
                />
            </Column>
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </Container>
    );
};

export default DeliveryPage;
