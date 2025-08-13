import { styled } from "styled-components";

export const SkeletonLoaderStyle = styled.section`
  .slider_loader {
    height: 350px;
    border-radius: 10px;
    margin: 6px;
    background: linear-gradient(90deg, #eee, #f5f5f5, #eee);
    background-size: 200% 100%;
    animation: shimmer 1.2s infinite;
    position: relative;
    span.title {
      position: absolute;
      top: 10px;
      height: 34px;
      width: 80%;
      margin-left: 10px;
      border-radius: 6px;
      background: linear-gradient(90deg, #dcdcdc, #e8e8e8, #dcdcdc);
      background-size: 200% 100%;
      animation: shimmerTitle 1.2s infinite;
    }
    span.title.two {
      bottom: 20px;
      top: inherit;
      height: 44px;
      width: 90%;
    }
  }
  .destination_page {
    .banner_img {
      background: linear-gradient(90deg, #dcdcdc, #e8e8e8, #dcdcdc);
      background-size: 200% 100%;
      animation: shimmer 1.2s infinite;
      position: relative;
    }
    .left_section {
      height: 300px;
      background: linear-gradient(90deg, #dcdcdc, #e8e8e8, #dcdcdc);
      background-size: 200% 100%;
      animation: shimmerTitle 1.2s infinite;
    }
    .right_section {
      height: 300px;
      background: linear-gradient(90deg, #dcdcdc, #e8e8e8, #dcdcdc);
      background-size: 200% 100%;
      animation: shimmerTitle 1.2s infinite;
    }
  }
  .tour_page {
    height:100%;
    .img {
      height: 350px;
      position: relative;
      padding: 6px;
      border-radius: 6px;
      margin-top: 6px;
      background: linear-gradient(90deg, #eee, #f5f5f5, #eee);
      background-size: 200% 100%;
      animation: shimmerTitle 1.2s infinite;
    }
    .button{
        height:40px;
        margin-top: 10px;
        border-radius: 10px;
        background: linear-gradient(90deg, #eee, #f5f5f5, #eee);
      background-size: 200% 100%;
      animation: shimmerTitle 1.2s infinite;
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
  @keyframes shimmerTitle {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;
