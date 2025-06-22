import { styled } from "styled-components";

export const TourPackageStyle = styled.section`
  margin-top: 60px;
  h2 {
    font-size: 26px;
    font-weight: 800;
  }
  p {
    margin: 10px 0px;
  }
  .tour_slider {
    .slider_card {
      position: relative;
      padding: 6px;
      > img {
        width: 100%;
        border-radius: 6px;
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
        > h3 {
          margin-bottom: auto;
          font-size: 16px;
        }
        > h4 {
          font-size: 20px;
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

  .collabration_logo_section {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 10px;
    background: #f7f7f7;
    padding: 36px 10px;
  }
`;
