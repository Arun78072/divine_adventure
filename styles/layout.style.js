import { styled } from "styled-components";

export const HederStyle = styled.section`
  position: sticky;
  top: 0px;
  background: #00000045;
  backdrop-filter: blur(5px);
  padding: 10px 0px;
  z-index: 999;

  .title_line_wrapper {
    overflow: hidden;
    white-space: nowrap;
  }

  .title_line {
    color: #fff;
    display: inline-block;
    padding-left: 100%;
    animation: scroll-left 30s linear infinite;
  }

  @keyframes scroll-left {
    from {
      transform: translateX(0%);
    }
    to {
      transform: translateX(-100%);
    }
  }

  .nav_bar {
    background: transparent;
    display: flex;
    align-items: center;
  }

  .navigation {
    flex: 1;
    justify-content: center;
    display: flex;
    gap: 24px;
    align-items: center;

    a {
      color: #fff;
      text-decoration: none;
      font-size: 18px;
    }

    .mega_menu {
      position: relative;
      padding: 20px 0px;
      a {
        color: #fff;
        text-decoration: none;
        align-items: center;
        display: flex;
        gap: 6px;
      }
      .sub_menu {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        background: #ffffff;
        padding: 10px 0;
        min-width: 180px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        > div h4 {
          color: #df6951;
          margin: 0px 8px;
          font-size: 18px;
        }
        ul {
          list-style: none;
        }
        a {
          display: block;
          padding: 10px 8px;
          color: #000;
          white-space: nowrap;
          text-decoration: none;
          font-size: 16px;

          &:hover {
            background: #f0f0f0;
          }
        }
      }

      &:hover {
        .sub_menu {
          display: flex;
          padding: 10px;
          gap: 20px;
          min-width: max-content;
        }
      }
    }
  }
`;
export const FooterStyle = styled.section``;
