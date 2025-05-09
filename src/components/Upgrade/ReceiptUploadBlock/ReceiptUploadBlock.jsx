import {
    Section,
    Title,
    QRImage,
    Disclaimer,
    PriceTag,
    UploadInput,
    SubmitButton
} from './ReceiptUploadBlockStyle.js';
import { Link } from 'react-router-dom';

const ReceiptUploadBlock = ({
                                qrUrl,
                                price,
                                onFileChange,
                                onSubmit,
                                submitDisabled
                            }) => (
    <>
        <Section>
            <Title>Сканируйте QR код</Title>
            <QRImage src={qrUrl} alt="QR Code" />
            <Disclaimer>
                Транзакция отслеживается только по фото. При неправильной сумме или файле чека
                мы не несем ответственности. Присылайте только официальный банковский чек с номером
                транзакции. При проблемах обращайтесь в <Link to="/contact">связь с нами</Link>.
            </Disclaimer>
            <PriceTag>Сумма: {price} сом</PriceTag>
        </Section>

        <Section>
            <Title>Загрузите фото чека</Title>
            <UploadInput type="file" onChange={onFileChange} />
            <SubmitButton onClick={onSubmit} disabled={submitDisabled}>
                Отправить
            </SubmitButton>
        </Section>
    </>
);

export default ReceiptUploadBlock;
