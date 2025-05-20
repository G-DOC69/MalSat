import { useState } from "react";
import {
  Image,
  NavButton,
  ImageSection,
  CarouselWrapper
} from "./PhotoCarouselStyle";

const PhotoCarousel = ({ photos = [] }) => {
  const [index, setIndex] = useState(0);
  if (!photos.length) return <Image src="/placeholder.jpg" alt="Нет фото" />;

  const prev = () => setIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  const next = () => setIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));

  return (
    <CarouselWrapper>
      <ImageSection>
        <NavButton onClick={prev} position="left">◀</NavButton>
        <Image src={photos[index]} alt={`Фото ${index + 1}`} />
        <NavButton onClick={next} position="right">▶</NavButton>
      </ImageSection>
    </CarouselWrapper>
  );
};

export default PhotoCarousel;
