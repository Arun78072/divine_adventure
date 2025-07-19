import styled from 'styled-components';

export const GridContainer = styled.div`
  padding: 2rem;
  background-color: #fff;
  text-align: center;
`;

export const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: bold;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

export const Card = styled.div`
  position: relative;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

export const CardImage = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
`;

export const CardOverlay = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
  padding: 1rem;
`;

export const CardTitle = styled.h3`
  color: white;
  font-size: 1.3rem;
  font-weight: bold;
  margin: 0;
`;
