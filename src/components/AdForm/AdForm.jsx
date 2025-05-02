import React from 'react';
import {
    Form,
    Input,
    TextArea,
    Label,
    SubmitButton,
    FileInput,
    FieldSet,
    ErrorText,
    ReplaceButton,
    Note,
    Select
} from './AdFormStyle';

const regionOptions = [
    {id:3, value: "БАТКЕНСКАЯ_ОБЛАСТЬ", label: "Баткенская область" },
    {id:4, value: "ОШСКАЯ_ОБЛАСТЬ", label: "Ошская область" },
    {id:6, value: "ЖАЛАЛ_АБАДСКАЯ_ОБЛАСТЬ", label: "Жалал-Абадская область" },
    {id:5,value: "НАРЫНСКАЯ_ОБЛАСТЬ", label: "Нарынская область" },
    {id:7, value: "ТАЛАССКАЯ_ОБЛАСТЬ", label: "Таласская область" },
    {id:8, value: "ЧУЙСКАЯ_ОБЛАСТЬ", label: "Чуйская область" },
    {id:9, value: "ИССЫК_КУЛЬСКАЯ_ОБЛАСТЬ", label: "Иссык-Кульская область" },
    {id:2, value: "ГОРОД_ОШ", label: "Город Ош" },
    {id:1, value: "ГОРОД_БИШКЕК", label: "Город Бишкек" }
];


const AdForm = ({
                        formData,
                        handleChange,
                        onPhotoChange,
                        handleSubmit,
                        loading,
                        error,
                        disablePhotoInput,
                        replacePhotos,
                        onReplaceModeActivate
                    }) => {
    return (
        <Form onSubmit={handleSubmit}>
            <FieldSet>
                <Label>Животное</Label>
                <Input
                    name="animal"
                    value={formData.animal}
                    onChange={handleChange}
                    required
                />
            </FieldSet>

            <FieldSet>
                <Label>Порода</Label>
                <Input
                    name="breed"
                    value={formData.breed}
                    onChange={handleChange}
                    required
                />
            </FieldSet>

            <FieldSet>
                <Label>Дата рождения</Label>
                <Input
                    type="date"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                />
            </FieldSet>

            <FieldSet>
                <Label>Регион</Label>
                <Select
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    required
                >
                    <option value="">Выберите регион</option>
                    {regionOptions.map(opt => (
                        <option key={opt.id} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </Select>
            </FieldSet>

            <FieldSet>
                <Label>Цена</Label>
                <Input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
            </FieldSet>

            <FieldSet>
                <Label>Описание</Label>
                <TextArea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </FieldSet>

            <FieldSet>
                <Label>Добавить фото</Label>
                <FileInput
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={onPhotoChange}
                    disabled={disablePhotoInput}
                />
                {disablePhotoInput && !replacePhotos && (
                    <Note>Достигнут лимит фотографий. Чтобы загрузить другие, замените все текущие.</Note>
                )}
            </FieldSet>

            {onReplaceModeActivate && (
                <ReplaceButton type="button" onClick={onReplaceModeActivate}>
                    Заменить все фото
                </ReplaceButton>
            )}

            {error && <ErrorText>{error}</ErrorText>}

            <SubmitButton type="submit" disabled={loading}>
                {loading ? "Сохранение..." : "Сохранить изменения"}
            </SubmitButton>
        </Form>
    );
};

export default AdForm;
