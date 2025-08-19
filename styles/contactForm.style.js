import { styled } from "styled-components";

export const ContactFormStyle = styled.div`
  background-color: rgb(234 231 231 / 95%);
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  @media (max-width: 768px) {
    max-width: 100%;
  }
  p.error {
    color: red;
    font-size: 10px;
    height: 16px;
    margin-left: 5px;
  }
  input[type="text"],
  input[type="email"],
  input[type="tel"],
  textArea,
  select {
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

  button {
    margin-top: 12px;
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
