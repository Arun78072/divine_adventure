import styled from "styled-components";

export const AboutStyle = styled.section`
  .about_container {
    margin: 100px auto;
    padding: 20px;
    max-width: 900px;
    color: #333;

    .about_title {
      text-align: center;
      font-size: 40px;
      font-weight: bold;
      color: #222;
      margin-bottom: 30px;
    }

    .about_text {
      font-size: 18px;
      line-height: 1.6;
      margin-bottom: 20px;
      text-align: justify;
    }

    .about_section {
      margin-top: 40px;

      .about_subtitle {
        font-size: 28px;
        color: #111;
        font-weight: 600;
        margin-bottom: 15px;
      }

      .about_list {
        list-style: disc;
        padding-left: 20px;

        li {
          margin-bottom: 12px;
          font-size: 18px;
          line-height: 1.5;
        }
      }
    }
  }
`;
