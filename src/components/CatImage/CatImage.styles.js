import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const ImageWrapper = styled.div`
  width: 100%; 
  max-width: 500px; 
  height: auto; 
  display: flex; 
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.5s ease-out; 
`;

export const StyledImage = styled.img`
  display: block; 
  max-width: 100%; 
  height: auto; 
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #eee; 
`;
