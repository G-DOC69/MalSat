import { useState } from 'react';
import { sendContactUsRequest } from '../../app/api.js';
import {Container, Title, Form, Label, Input, TextArea, Select, SubmitButton, Message} from './ContactUsPageStyle';

const ContactUsPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        topic: 'ads',
        content: ''
    });

    const [statusMessage, setStatusMessage] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusMessage('');
        setError(false);

        try {
            setLoading(true);
            const res = await sendContactUsRequest(formData);

            if (res.status === 200) {
                setStatusMessage('Ваше сообщение отправлено. Мы свяжемся с вами при необходимости.');
                setFormData({ email: '', topic: 'ads', content: '' });
            }
        } catch (err) {
            const code = err.response?.status;

            switch (code) {
                case 400:
                    setStatusMessage("Проверьте корректность введённых данных.");
                    break;
                case 429:
                    setStatusMessage("Слишком много запросов. Попробуйте позже.");
                    break;
                case 500:
                    setStatusMessage("Ошибка сервера. Попробуйте позже.");
                    break;
                default:
                    setStatusMessage(err.response?.data?.message || "Неизвестная ошибка.");
            }

            setError(true);
        } finally {
            setLoading(false);
        }
    };


    return (
        <Container>
            <Title>Связаться с нами</Title>
            <Form onSubmit={handleSubmit}>
                <Label>Ваш Email</Label>
                <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <Label>Тема обращения</Label>
                <Select
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                >
                    <option value="ads">Объявления</option>
                    <option value="receipts">Чеки</option>
                    <option value="account">Аккаунт</option>
                    <option value="other">Другое</option>
                </Select>

                <Label>Сообщение</Label>
                <TextArea
                    name="content"
                    rows="6"
                    value={formData.content}
                    onChange={handleChange}
                    required
                />

                <SubmitButton type="submit" disabled={loading}>
                    {loading ? "Отправка..." : "Отправить"}
                </SubmitButton>

                {statusMessage && (
                    <Message error={error} aria-live="polite">{statusMessage}</Message>
                )}
            </Form>
        </Container>
    );
};

export default ContactUsPage;
