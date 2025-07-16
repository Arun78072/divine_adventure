import styled from "styled-components";

const ProfileStyle = styled.section`
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
        padding-bottom: 12px;
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
  .location_section {
    padding: 30px;
    h3 {
      margin: 10px 0px;
    }
  }
  .gallery_section {
    padding: 30px;
    h3 {
      margin: 10px 0px;
    }
    .gallery_box {
      margin-top: 30px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      > img {
        width: 100%;
        border-radius: 10px;
      }
    }
  }
  .form_box {
    background-color: #f9fafb;
    padding: 40px 20px;
    border-radius: 10px;
    margin-top: 50px;

    h1 {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 20px;
      color: #333;
    }
    .form_title {
      font-size: 24px;
      margin: 16px 0px;
    }
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #222;
    }

    input,
    select,
    textarea {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-size: 15px;
      background-color: #fff;
      transition: all 0.2s ease-in-out;
      font-family: inherit;

      &:focus {
        border-color: #007bff;
        outline: none;
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
      }
    }
    .add_more_button {
      width: fit-content;
      margin-left: auto;
    }
  }
  .tour_form {
    border: 2px solid #939393;
    border-radius: 10px;
    overflow: hidden;
    margin: 10px 0px;
    padding: 20px;
    button.del_button {
      cursor: pointer;
      width: 44px;
      margin-left: auto;
      font-size: 28px;
      border-radius: 6px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #df6951;
      border: 2px solid;
    }
  }
  .form_grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;

    .col-span-2 {
      grid-column: span 2;
    }
   

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  .cover_image {
    .preview_image {
      position: relative;

      img {
        width: 100%;
        height: 400px;
        border-radius: 10px;
      }
    }
    .image_box {
      height: 400px;
      width: 100%;
      border-radius: 10px;
      position: relative;
      border: 2px dashed #888888;
      input[type="file"] {
        height: 100%;
        width: 100%;
        opacity: 0;
        cursor: pointer;
        z-index: 9;
        position: relative;
      }
      span {
        position: absolute;
        left: 50%;
        top: 50%;
        cursor: pointer;
        transform: translate(-50%, -50%);
      }
    }
  }
  .image_delete_button {
    position: absolute;
    right: 10px;
    font-size: 28px;
    border: 2px solid #fff;
    color: #df6951;
    top: 10px;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .add_multiple_list {
    ul {
      display: flex;
      list-style: none;
      gap: 14px;
      flex-wrap: wrap;
      margin-bottom: 10px;
      li {
        border: 1px solid #363535;
        border-radius: 6px;
        padding: 4px 6px;
        display: flex;
        align-items: center;
        gap: 10px;
        button {
          cursor: pointer;
          color: #df6951;
          border: none;
          font-size: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    .input_group {
      position: relative;
      input {
        padding: 10px 40px 10px 12px;
      }
      button {
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        background: #df6951;
        border: none;
        color: #fff;
        width: 26px;
        height: 26px;
        font-size: 26px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
      }
    }
  }
  .multiple_image_section {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 30px;
    .image_box {
      width: 350px;
      height: 200px;
      position: relative;
      border-radius: 10px;
      overflow: hidden;
      > img {
        width: 100%;
        height: 100%;
      }
    }
    .cover_image .image_box span {
      width: 100%;
      text-align: center;
    }
  }
`;

export default ProfileStyle;
