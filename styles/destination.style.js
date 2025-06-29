import styled from "styled-components";

export const DestinationStyle = styled.section`
  .view_section {
    position: relative;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
    margin-top: 30px;
    .left_section {
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      padding: 10px;
      border-radius: 10px;
      .tour_title {
        font-size: 32px;
      }
      .price {
        display: flex;
        align-items: center;
        > p {
          font-size: 24px;
          font-weight: 500;
        }
      }
      img.tour_image {
        width: 100%;
        height: 400px;
        object-fit: cover;
        border-radius: 10px;
        margin: 20px 0px;
      }

      .tour_plan {
        .title {
          padding: 10px 10px 30px 10px;
        }
        .day_section {
          position: relative;
          padding-left: 60px;
          padding-bottom: 50px;
          .tour_content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            > div {
              width: 100%;
            }
          }
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
            padding: 0px 16px;
            li {
              padding: 6px 0px;
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

      .gallery_section {
        margin-top: 50px;
        h2 {
          margin: 10px 0px;
        }
        .gallery_grid {
          margin-top: 30px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 20px;
          > img {
            width: 100%;
            border-radius: 10px;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
    .right_section {
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      padding: 10px;
      border-radius: 10px;
      .info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 12px 0px;
        > p {
          width: 100%;
          text-transform: capitalize;
        }
        > p:first-child {
          color: #df6951;
          font-weight: 500;
        }
      }
      .booking_form {
        margin-top: 40px;
        background-color: #f9f9f9;
        padding: 10px;
        border-radius: 10px;

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
          margin-top: 12px;
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
        .primary_button {
          width: 100%;
        }
        span.error {
          font-size: 12px;
          height: 20px;
          color: red;
          display: block;
          margin-left: 5px;
        }
      }
    }
  }

  .location_section {
    padding: 30px 0px;
    h3 {
      margin: 10px 0px;
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
        object-fit: cover;
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
export const TourList = styled.section`
  .post_card {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 24px;
    margin: 20px 0px;
    > div {
      > h1 {
        font-size: 20px;
        margin-left: 10px;
      }
      .description {
        font-size: 16px;
        margin: 0px 10px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        height: 68px;
      }
    }
  }
`;
export const Information = styled.section`
  .tour-container {
    padding: 32px;
    font-family: sans-serif;

    .tour-header {
      display: flex;
      justify-content: space-between;
      gap: 32px;

      .left {
        flex: 1;
      }
    }

    h1 {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 12px;
      color: #333;
    }

    p {
      margin-bottom: 12px;
      font-size: 16px;
      line-height: 1.5;
      color: #555;

      strong {
        color: #df6951;
        font-weight: 600;
      }
    }

    .price {
      font-size: 20px;
      font-weight: 600;
      color: #df6951;

      span {
        font-size: 14px;
        color: #df6951;
        margin-left: 4px;
      }
    }

    .reviews {
      font-size: 14px;
      color: #777;
    }

    .description {
      margin-top: 10px;
      font-size: 15px;
      color: #444;
    }
  }
`;
