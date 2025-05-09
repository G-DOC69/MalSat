import { useState, useEffect } from 'react';
import {
    getAllTariffsAdmin,
    updateTariffsAdmin
} from '../../app/adminApi.js';
import {
    TariffPanelContainer,
    PanelTitle,
    TextArea,
    ActionButton,
    MessageBox
} from './styles/AdminTariffPanelStyle';

const AdminTariffPanel = ({ token }) => {
    const [, setTariffs] = useState([]);
    const [jsonText, setJsonText] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchTariffs = async () => {
            try {
                const res = await getAllTariffsAdmin(token);
                setTariffs(res.data);
                setJsonText(JSON.stringify(res.data, null, 2));
            } catch {
                setMessage('Ошибка загрузки тарифов');
            }
        };
        fetchTariffs();
    }, []);

    const handleSubmit = async () => {
        try {
            const parsed = JSON.parse(jsonText);
            await updateTariffsAdmin(token, parsed);
            setMessage('Тарифы обновлены');
        } catch (err) {
            console.error(err)
            setMessage('Ошибка при отправке: неверный JSON или проблема соединения');
        }
    };

    return (
        <TariffPanelContainer>
            <PanelTitle>Редактирование тарифов</PanelTitle>
            <TextArea
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                rows={20}
            />
            <ActionButton onClick={handleSubmit}>Обновить тарифы</ActionButton>
            {message && <MessageBox>{message}</MessageBox>}
        </TariffPanelContainer>
    );
};

export default AdminTariffPanel;
