import { ImageWrapper, StyledImage } from "./CatImage.styles.js";

const CatImage = ({ src, alt }) => {
  if (!src) return null;

  return (
    <ImageWrapper>
      <StyledImage src={src} alt={alt} />
    </ImageWrapper>
  );
};

export default CatImage;
