import { useState } from "react";
import { Image, NavButton, ImageSection } from "./PhotoCarouselStyle";

const PhotoCarousel = ({ photos = [] }) => {
    const [index, setIndex] = useState(0);
    if (!photos.length) return <Image src="/placeholder.jpg" alt="Нет фото" />;

    const prev = () => setIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
    const next = () => setIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));

    return (
        <ImageSection>
            <NavButton onClick={prev}>◀</NavButton>
            <Image src={photos[index]} alt={`Фото ${index + 1}`} />
            <NavButton onClick={next}>▶</NavButton>
        </ImageSection>
    );
};

export default PhotoCarousel;
