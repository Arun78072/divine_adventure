// components/Banner.styles.js
import styled from "styled-components";

export const BannerSection = styled.section`
  position: relative;
  background-image: url("/assets/holiday-bg.png");
  background-size: cover;
  background-position: center;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 60px;
  color: white;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 40px 20px;
  }
`;

export const LeftContent = styled.div`
  max-width: 600px;
  @media (max-width : 768px){
    max-width: 100%;
  }
  h1 {
    font-size: 30px;
    line-height: 1.4;
    font-weight: 600;
    margin: 0;
  }

  span {
    display: block;
    font-size: 36px;
    font-weight: bold;
    margin-top: 10px;
  }

  hr {
    width: 60px;
    height: 3px;
    background: white;
    border: none;
    margin: 16px 0;
  }
`;

export const RightForm = styled.div`
max-width: 300px;
`;
