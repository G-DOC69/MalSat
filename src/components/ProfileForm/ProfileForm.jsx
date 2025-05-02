import {
        Form,
        Label,
        Input,
        SubmitButton,
        PreviewImage,
        FieldSet
} from './ProfileFormStyle';

const ProfileForm = ({
                             formData = {},
                             handleChange,
                             handlePhotoChange,
                             photoPreview
                     }) => (
    <Form>
            <FieldSet>
                    <Label>Имя пользователя</Label>
                    <Input
                        type="text"
                        name="username"
                        value={formData.username || ''}
                        onChange={handleChange}
                        required
                    />
            </FieldSet>

            <FieldSet>
                    <Label>Фото профиля</Label>
                    <Input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={handlePhotoChange}
                    />
                    {photoPreview && <PreviewImage src={photoPreview} alt="Фото профиля" />}
            </FieldSet>

            <FieldSet>
                    <Label>Электронная почта</Label>
                    <Input
                        type="email"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleChange}
                        required
                    />
            </FieldSet>

            <FieldSet>
                    <Label>Телефон</Label>
                    <Input
                        type="text"
                        name="phone"
                        value={formData.phone || ''}
                        onChange={handleChange}
                        required
                    />
            </FieldSet>

            <FieldSet>
                    <Label>Пароль (для подтверждения)</Label>
                    <Input
                        type="password"
                        name="password"
                        value={formData.password || ''}
                        onChange={handleChange}
                        required
                    />
            </FieldSet>

            <SubmitButton type="submit">Сохранить изменения</SubmitButton>
    </Form>
);

export default ProfileForm;
