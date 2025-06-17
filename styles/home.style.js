import { styled } from "styled-components";

export const TourPackageStyle = styled.section`
  .tour_slider {
    button.slick-arrow {
      background: red;
    }
    .slider_card {
      position: relative;
      padding:10px;
      border-radius:10px;
      >img{
        width:100%;
       
      }
      .card_content {
        position: absolute;
        top: 0px;
        z-index: 9;
        display: flex;
        flex-direction: column;
        justify-content: end;
        height: 100%;
        color: #fff;
      }
    }
  }
`;
