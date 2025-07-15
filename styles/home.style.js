import { styled } from "styled-components";

export const TourPackageStyle = styled.section`
  margin-top: 40px;
  h2 {
    margin-top: 20px;
    font-size: 22px;
    font-weight: 600;
  }
  p {
    margin: 10px 0px;
    font-size: 16px;
  }
  .tour_slider {
    .slider_card {
      position: relative;
      padding: 6px;
      > img {
        width: 100%;
        border-radius: 6px;
        height: 260px;
        object-fit: cover;
      }
      .card_content {
        position: absolute;
        top: 0px;
        border-radius: 6px;
        z-index: 9;
        display: flex;
        flex-direction: column;
        justify-content: end;
        height: calc(100% - 12px);
        color: #fff;
        padding: 16px;
        background: #00000045;
        width: calc(100% - 12px);
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        transition: all 0.5s;
        background: #00000066;
        /* backdrop-filter: blur(2px); */
        > h3 {
          margin-bottom: auto;
          font-size: 18px;
          text-transform: capitalize;
        }
        > span {
          font-size: 18px;
        }
        > h4 {
          font-size: 20px;
          display: flex;
          align-items: center;
        }
        &:hover {
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
`;

export const BannerSetion = styled.section`
  /* margin-top: -130px; */

  button.slick-arrow.slick-prev {
    left: 22px;
  }
  button.slick-arrow.slick-next {
    right: 22px;
  }

  .banner_img_section {
    position: relative;
    .content {
      position: absolute;
      bottom: 0px;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 800px;
      text-align: center;

      > div {
        display: flex;
        padding: 20px;
        background: #00000045;
        backdrop-filter: blur(5px);
        border-radius: 10px;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        margin-top: 24px;
      }

      h2 {
        font-size: 48px;
        text-shadow: 2px 2px #00000075;
        color: #fff;
        font-weight: 700;
      }

      .select_box {
        position: relative;
        flex: 1;

        select {
          width: calc(100% - 4px);
          padding: 20px;
          background: transparent;
          border: none;
          color: #fff;
        }

        &::after {
          content: "";
          position: absolute;
          background: #ffffff94;
          border-radius: 10px;
          width: 4px;
          height: 100%;
          right: -12px;
        }
      }
    }
  }

  .home_banner {
    .slick-slide img {
      width: 100%;
      object-fit: cover;
      @media (max-width: 500px) {
        height: 128px;
      }
    }
  }
  .collabration_logo_section {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 10px;
    background: #f7f7f7;
    padding: 36px 10px;
    @media (max-width: 500px) {
      padding: 20px 10px;
    }
    img {
      width: 180px;
      height: auto;
      object-fit: contain;
      @media (max-width: 900px) {
        width: 100px;
      }
      @media (max-width: 500px) {
        width: 80px;
      }
    }
  }
`;

export const ServiceCard = styled.section`
  .category_container {
    margin: 100px 0;

    .category_title {
      text-align: center;
      font-size: 40px;
      margin: 2rem 0;
    }

    .category_image {
      text-align: center;
      display: block;
    }

    .card_section {
      display: grid;
      gap: 40px;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      @media (max-width: 900px) {
        grid-template-columns: 1fr 1fr;
      }
      @media (max-width: 500px) {
        grid-template-columns: 1fr;
      }
    }

    .category_card {
      position: relative;
      box-shadow: rgb(99 99 99 / 11%) 0px 5px 8px 0px;
      max-width: 300px;
      padding: 20px;
      text-align: center;
      border-radius: 20px;
      cursor: pointer;
      transform: translateY(0px);
      transition: all 0.5s;
      margin: auto;
      &:hover {
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        transform: translateY(-12px);
      }

      .card_heading {
        font-size: 20px;
        margin: 20px 0;
        color: #000000;
        font-weight: 400;
      }

      .card_text {
        font-size: 1rem;
        line-height: 1.4;
      }
    }
  }
`;

export const CountriesStyle = styled.section`
  background-color: #df6951;
  color: #fff;
  padding: 30px 0px;

  .title {
    line-height: 60px;
    font-weight: 600;
    margin-left: 10px;
  }
  .slider_section {
    .link_url {
      color: #000;
      text-decoration: none;
    }
    .slider_card {
      height: 260px;
      background: #fff;

      margin: 6px;
      border-radius: 5px;
      overflow: hidden;
      .card_content h3 {
        color: #000;
        padding: 3px;
        height: 35px;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 100%;
        white-space: nowrap;
      }
      > img {
        width: 100%;
        height: calc(100% - 40px);
        object-fit: cover;
      }
    }
    button.slick-arrow.slick-next {
      right: 6px;
      top: -27px;
      z-index: 9;
    }
    button.slick-arrow.slick-prev {
      z-index: 9;
      left: 91%;
      top: -27px;
    }
  }
`;

export const ExploreSection = styled.section`
  .explore_section {
    display: flex;
    justify-content: center;
    margin: 80px 0;

    @media (max-width: 786px) {
      flex-direction: column;
    }

    > div {
      position: relative;
      width: 100%;

      img {
        width: 100%;
        height: 400px;
        overflow: hidden;
        object-fit: cover;
      }
    }

    .explore_content {
      position: absolute;
      z-index: 9;
      background: #0000001c;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      backdrop-filter: blur(2px);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      > h1 {
        font-size: 54px;
        color: #fff;
        margin-bottom: 20px;
      }

      > button.secandary_button {
        color: #ffffff;
        border: 2px solid #fff;
      }
    }
  }
`;

export const ReviewSection = styled.section`
  .review_section {
    background: #f8f8f8;
    padding-bottom: 50px;
  }
  .review_section .category_title {
    padding: 30px 0px;
    text-align: center;
  }
  .review_section .review_card {
    max-width: 800px;
    margin: 30px auto auto auto;
    text-align: center;
    background: #fff;
    color: #000;
    padding: 20px;
    border-radius: 10px;
  }
  .review_section .user_image {
    background: #fff;
    border-radius: 50%;
    width: 100px;
    margin: -66px auto 34px auto;
    height: 100px;
    border: 2px solid #df6951;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .review_section p.review_discription {
    margin-bottom: 30px;
  }
`;

export const InstaGallery = styled.section`
  .insta_title {
    padding: 30px 0px;
    text-align: center;
  }
  .insta_post {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    @media (max-width: 700px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 500px) {
      grid-template-columns: 1fr;
    }
    .insta_img {
      width: 100%;
    }
  }
`;
