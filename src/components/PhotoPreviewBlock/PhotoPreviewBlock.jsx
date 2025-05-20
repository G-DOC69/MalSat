import React from 'react';
import {
    PreviewContainer,
    PreviewGrid,
    PreviewImage,
    Title
} from './PhotoPreviewBlockStyle';

const PhotoPreviewBlock = ({ previewPhotos }) => {
    if (!previewPhotos?.length) return null;

    return (
        <PreviewContainer>
            <Title>Текущие фотографии</Title>
            <PreviewGrid>
                {previewPhotos.map((url, index) => (
                    <PreviewImage key={index} src={url} alt={`Фото ${index + 1}`} />
                ))}
            </PreviewGrid>
        </PreviewContainer>
    );
};

export default PhotoPreviewBlock;
