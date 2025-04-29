import {
  ImageContainer,
  CatImage,
  Placeholder,
} from "./CatImageDisplay.styles";

function CatImageDisplay({ imageUrl, isLoading }) {
  return (
    <ImageContainer>
      {isLoading ? (
        <Placeholder>Loading Cat Image...</Placeholder>
      ) : imageUrl ? (
        <CatImage src={imageUrl} alt="A random cat" />
      ) : (
        <Placeholder>No cat image loaded yet.</Placeholder>
      )}
    </ImageContainer>
  );
}

export default CatImageDisplay;
