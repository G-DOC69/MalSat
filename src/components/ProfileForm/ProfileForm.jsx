import {
    Form,
    Label,
    Input,
    SubmitButton,
    PreviewImage,
    FieldSet,
    Select,
    ErrorText
} from './ProfileFormStyle';
import countryPhoneCodes from '../../app/countryPhoneCodes';

const ProfileForm = ({
                         formData = {},
                         handleChange,
                         handlePhotoChange,
                         photoPreview,
                         loading = false,
                         selectedCode,
                         handleCodeChange,
                         handlePhoneChange,
                         phoneError
                     }) => (
    <Form>
        <FieldSet>
            <Label htmlFor="username">Имя пользователя</Label>
            <Input
                id="username"
                type="text"
                name="username"
                value={formData.username || ''}
                onChange={handleChange}
                required
            />
        </FieldSet>

        <FieldSet>
            <Label htmlFor="photo">Фото профиля</Label>
            <Input
                id="photo"
                type="file"
                name="photo"
                accept="image/*"
                onChange={handlePhotoChange}
            />
            {photoPreview && <PreviewImage src={photoPreview} alt="Фото профиля" />}
        </FieldSet>

        <FieldSet>
            <Label htmlFor="email">Электронная почта</Label>
            <Input
                id="email"
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                required
            />
        </FieldSet>

        <FieldSet>
            <Label>Телефон</Label>
            <Select value={selectedCode} onChange={handleCodeChange}>
                {countryPhoneCodes.map(({ code, country }) => (
                    <option key={code} value={code}>{country} ({code})</option>
                ))}
            </Select>
            <Input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber || ''}
                onChange={handlePhoneChange}
                required
            />
            {phoneError && <ErrorText>{phoneError}</ErrorText>}
        </FieldSet>

        <FieldSet>
            <Label htmlFor="password">Пароль (для подтверждения)</Label>
            <Input
                id="password"
                type="password"
                name="password"
                value={formData.password || ''}
                onChange={handleChange}
                required
            />
        </FieldSet>

        <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Сохранение...' : 'Сохранить изменения'}
        </SubmitButton>
    </Form>
);

export default ProfileForm;
