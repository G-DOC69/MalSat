import countryPhoneCodes from "../../../app/countryPhoneCodes.jsx";
import {
    Form,
    Select,
    Input,
    SubmitButton,
    ErrorText
} from './ConfirmFormStyle';

const ConfirmForm = ({
                         confirmForm = {},
                         onFormChange = () => {},
                         onPhoneChange = () => {},
                         onCodeChange = () => {},
                         selectedCode = '',
                         phoneError = '',
                         onSubmit = () => {}
                     }) => (
    <Form onSubmit={onSubmit}>
        <Select value={selectedCode} onChange={onCodeChange}>
            {countryPhoneCodes.map(c => (
                <option key={c.code} value={c.code}>
                    {c.code} {c.country}
                </option>
            ))}
        </Select>
        <Input
            type="text"
            placeholder="Телефон"
            value={confirmForm.phoneNumber || ''}
            onChange={onPhoneChange}
            required
        />
        {phoneError && <ErrorText>{phoneError}</ErrorText>}
        <Input
            type="text"
            placeholder="Адрес"
            value={confirmForm.address || ''}
            onChange={e => onFormChange(prev => ({ ...prev, address: e.target.value }))}
            required
        />
        <SubmitButton type="submit">Отправить</SubmitButton>
    </Form>
);

export default ConfirmForm;
