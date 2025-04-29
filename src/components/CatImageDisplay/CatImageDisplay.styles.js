import styled from 'styled-components';

export const ImageContainer = styled.div`
  width: 100%;
  max-width: 400px; 
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  box-sizing: border-box;
  overflow: hidden; 
`;

export const CatImage = styled.img`
  display: block;
  max-width: 100%;
  height: auto; 
  border-radius: 4px;
`;

export const Placeholder = styled.div`
  font-size: 1.2rem;
  color: #555;
  text-align: center;
  padding: 20px; 
`;