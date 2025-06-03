import styled from "styled-components";

const DestinationStyle = styled.section`
  .view_section {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    margin-top: -40px;
    position: relative;
    background: #fff;
    overflow: hidden;
    border-radius: 10px;
  }
  .tab_section {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    > button {
      background: #9290903d;
      width: 100%;
      padding: 25px;
      border: none;
      font-size: 24px;
      cursor: pointer;
      &.active {
        background: #fff;
      }
    }
  }

  .booking_form {
    max-width: 380px;
    background-color: #f9f9f9;
    padding: 32px;
    h2 {
      font-size: 24px;
      color: #1c2141;
      margin-bottom: 16px;
      text-align: center;
    }
    p {
      font-size: 14px;
      color: #333;
      margin-bottom: 20px;
      text-align: center;
    }
    input,
    textarea {
      width: 100%;
      padding: 14px;
      margin-bottom: 12px;
      border: none;
      background-color: #fff;
      border-radius: 6px;
      font-size: 14px;
      box-shadow: 0 0 0 1px #ddd;
    }
    input::placeholder,
    textarea::placeholder {
      color: #bbb;
    }
    textarea {
      resize: vertical;
      min-height: 80px;
    }
    .btn {
      width: 100%;
      padding: 12px;
      font-size: 15px;
      font-weight: 600;
      border-radius: 6px;
      margin-bottom: 10px;
      cursor: pointer;
    }
    .booking_form .btn.primary {
      background-color: #f0673e;
      color: white;
      border: none;
    }
    .btn.secondary {
      background-color: #db4935;
      color: white;
      border: none;
    }
  }
  .tour_plan {
    padding: 30px;
    .title {
      padding: 10px 10px 30px 10px;
    }
    .day_section {
      position: relative;
      padding-left: 60px;
      padding-bottom: 50px;
      span {
        position: absolute;
        left: 0px;
        background: #df6951;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 10px;
        color: #fff;
        font-weight: 600;
        z-index: 9;
      }
      h3 {
        padding: 12px 0px;
      }
      ul {
        padding: 16px;
        li {
          padding: 10px 0px;
        }
      }
    }
    .day_section::after {
      content: "";
      position: absolute;
      top: 0;
      left: 17px;
      width: 2px;
      height: 100%;
      background-image: repeating-linear-gradient(
        to bottom,
        #df6951,
        #df6951 10px,
        transparent 10px,
        transparent 16px
      );
    }
    .day_section:last-child::after {
      background-image: none;
    }
  }
`;

export default DestinationStyle;
