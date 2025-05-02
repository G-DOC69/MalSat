import React from 'react';
import {
    PreviewContainer,
    PreviewImage,
    Title
} from './PhotoPreviewBlockStyle';

const PhotoPreviewBlock = ({ previewPhotos }) => {
    if (!previewPhotos?.length) return null;

    return (
        <PreviewContainer>
            <Title>Текущие фотографии</Title>
            {previewPhotos.map((url, index) => (
                <PreviewImage key={index} src={url} alt={`Фото ${index + 1}`} />
            ))}
        </PreviewContainer>
    );
};

export default PhotoPreviewBlock;
