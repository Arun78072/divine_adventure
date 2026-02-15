// components/BlogSection.styles.js
import styled from 'styled-components';

export const BlogSectionWrapper = styled.section`
  padding: 40px 20px;


`;

export const Heading = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #333;
`;

export const BlogGrid = styled.div`
  /* display: flex;
  gap: 20px;
  flex-wrap: wrap; */
  a{
    text-decoration:none;
  }
  /* @media (max-width:600px){
    flex-direction:column;
  } */
`;

export const BlogCard = styled.div`
  /* flex:1; */
  background: #fff;
  overflow: hidden;
  cursor: pointer;
  padding:10px;
`;

export const BlogImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 6px;
`;

export const BlogTitle = styled.p`
  margin-top: 12px;
  font-size: 16px;
  font-weight: 500;
  color: #c20f0f;
  border-bottom: 3px solid #c20f0f;
  padding-bottom: 4px;
`;

export const TourPackageStyle = styled.section`
  margin-top: 80px;
  width:100%;
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
      > img  {
        width: 100%;
        border-radius: 6px;
        height: 350px;
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