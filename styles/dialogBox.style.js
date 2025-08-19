import { styled } from "styled-components";

export const DialougBoxStyle = styled.section`
  .dialoug_box {
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 9999;
    transform: translate(-50%, -50%);
    width: 24rem;
    background: #fff;
    padding: 1rem;
    border-radius: 0.5rem;
    .close_btn {
      display: block;
      margin-left: auto;
      font-size: 22px;
      border: none;
      background: none;
      cursor: pointer;
    }
  }

  .background_button {
    background: #00000054;
    cursor: pointer;
    height: 100%;
    width: 100%;
    top: 0px;
    position: fixed;
    left: 0px;
    z-index: 999;
    backdrop-filter: blur(3px);
  }
`;
