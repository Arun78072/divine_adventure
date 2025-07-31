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

    /* Founder Section */
    .founder_section {
      margin-top: 50px;

      .founder_container {
        display: flex;
        align-items: center;
        gap: 25px;
        background: #f9f9f9;
        padding: 25px;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);

        .founder_image {
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #ddd;
        }

        .founder_name {
          font-size: 22px;
          font-weight: 700;
          color: #222;
          margin-bottom: 10px;
        }

        p {
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 10px;
          color: #444;
        }
      }

      /* Responsive */
      @media (max-width: 768px) {
        .founder_container {
          flex-direction: column;
          text-align: center;

          .founder_image {
            margin-bottom: 15px;
          }
        }
      }
    }
  }
`;
