import  { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    checkUpgradeEligibility,
    uploadUpgradeReceipt
} from '../../app/api';
import {
    Container,
    MessageBox,
    NavLinkButton
} from './UpgradePageStyle';
import OptionSelector from "../../components/Upgrade/OptionSelector/OptionSelector.jsx";
import ReceiptUploadBlock from "../../components/Upgrade/ReceiptUploadBlock/ReceiptUploadBlock.jsx";
import {useCheckUser} from "../../hooks/useCheckUser.js";

const UpgradePage = () => {
    const { adId } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token');

    const [tariffs, setTariffs] = useState([]);
    const [qrUrl, setQrUrl] = useState('');
    const [priority, setPriority] = useState('');
    const [duration, setDuration] = useState('');
    const [file, setFile] = useState(null);
    const [locked, setLocked] = useState(false);
    const [price, setPrice] = useState(null);
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useCheckUser()

    useEffect(() => {
        const fetchEligibility = async () => {
            try {
                const res = await checkUpgradeEligibility( adId,token);
                setTariffs(res.data.tariffs);
                setQrUrl(res.data.qrPhotoUrl);
            } catch {
                navigate('/');
            }
        };
        fetchEligibility();
    }, [adId]);

    const handleSelect = (type) => (value) => {
        if (locked) return;

        const nextPriority = type === 'priority' ? value : priority;
        const nextDuration = type === 'duration' ? value : duration;

        if (type === 'priority') setPriority(value);
        if (type === 'duration') setDuration(value);

        if (nextPriority && nextDuration) {
            setLocked(true);
            const match = tariffs.find(t =>
                t.priority === nextPriority && t.durationDays === parseInt(nextDuration)
            );
            if (match) setPrice(match.price);
        }
    };

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (!selected) return;

        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!allowedTypes.includes(selected.type)) {
            setMessage("Допустимы только изображения (JPG, PNG, WEBP).");
            return;
        }

        if (selected.size > maxSize) {
            setMessage("Размер файла не должен превышать 5MB.");
            return;
        }
        setFile(selected);
        setMessage("");
    };


    const handleSubmit = async () => {
        if (!file || !locked) return;
        const millis = parseInt(duration) * 86400000;
        const form = {
            adId: parseInt(adId),
            requestedPriority: priority,
            durationMillis: millis
        };
        try {
            const formData = new FormData();
            formData.append("form", new Blob([JSON.stringify(form)], { type: "application/json" }));
            formData.append("photo", file);
            const res = await uploadUpgradeReceipt(token, formData);
            const msg = res.headers['x-message'];
            setMessage(msg || 'Чек принят, ожидайте проверки.');
            setSubmitted(true);
        } catch {
            setMessage('Ошибка при загрузке.');
        }
    };

    const formatDurationLabel = (days) => {
        switch (days) {
            case 15: return '15 дней';
            case 30: return '1 месяц';
            case 90: return '3 месяца';
            case 180: return '6 месяцев';
            default: return `${days} дней`;
        }
    };

    const durationOptions = [...new Set(tariffs.map(t => t.durationDays))]
        .sort((a, b) => a - b)
        .map(days => ({
            label: formatDurationLabel(days),
            value: days.toString()
        }));


    return (
        <Container>
            <OptionSelector
                title="Выберите тип приоритета"
                options={[
                    { label: 'FEATURED', value: 'FEATURED' },
                    { label: 'PREMIUM', value: 'PREMIUM' }
                ]}
                onSelect={handleSelect('priority')}
                disabled={locked}
            />

            <OptionSelector
                title="Выберите длительность"
                options={durationOptions}
                onSelect={handleSelect('duration')}
                disabled={locked}
            />

            {locked && (
                <ReceiptUploadBlock
                    qrUrl={qrUrl}
                    price={price}
                    onFileChange={handleFileChange}
                    onSubmit={handleSubmit}
                    submitDisabled={!file || submitted}
                />
            )}

            {message && (
                <MessageBox>
                    <p>{message}</p>
                    <NavLinkButton to={`/ad/${adId}`}>Перейти к объявлению</NavLinkButton>
                    <NavLinkButton to="/contact">Связаться с поддержкой</NavLinkButton>
                </MessageBox>
            )}
        </Container>
    );
};

export default UpgradePage;
