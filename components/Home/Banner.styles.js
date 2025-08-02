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
  background-color: rgba(255, 255, 255, 0.95);
  padding: 20px;
  border-radius: 8px;
  max-width: 300px;
  width: 100%;
  @media (max-width : 768px){
    max-width: 100%;
  }
  p.error {
    color: red;
    font-size: 10px;
    height: 16px;    margin-left: 5px;
}
  input[type="text"],
  input[type="email"],
  input[type="tel"] ,
  textArea , select{
    width: 100%;
    padding: 12px;
    margin-top: 12px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
  }

  label {
    font-size: 12px;
    color: #333;
    display: block;
    margin-bottom: 8px;
    line-height: 1.4;
  }

  /* .checkbox {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    margin-bottom: 14px;
    font-size: 12px;
  }

  .checkbox input {
    margin-top: 2px;
  }

  .checkbox a {
    color: #007bff;
    text-decoration: underline;
  } */

  button {
    margin-top:12px;
    background-color: red;
    color: white;
    padding: 10px 0;
    width: 100%;
    font-weight: 600;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;
