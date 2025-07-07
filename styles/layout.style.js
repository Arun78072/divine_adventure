import { styled } from "styled-components";

export const HederStyle = styled.section`
  position: sticky;
  top: 0px;
  background: #000000cf;
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
      font-size: 16px;
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
          display: grid;
          grid-template-columns: 1fr 1fr;
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
  .navigation{
    @media (max-width: 1050px) {
      display: none;
    }
  }
  .mobile_navbar.navigation {
    position: absolute;
    display: flex
;
    height: 100vh;
    width: 100%;
    overflow: scroll;
    background: #000000cf;
    backdrop-filter: blur(5px);
    top: 100px;
    left: 0px;
    flex-direction: column;
    align-items: start;
    justify-content: flex-start;
    padding: 20px;
    .mega_menu {
      padding: 0px;
    }
    .mega_menu.active_mega_menu,
    .mega_menu:hover {
      .sub_menu {
        position: relative;
        display: block;
        top: 0px;
        background: none;
        box-shadow: none;
        padding: 0px;
        ul {
          grid-template-columns: 1fr;
        }
        a {
          color: #ffffff;
        }
        a:hover {
          background: transparent;
        }
      }
    }
  }
  
  .hamburger_menu {
    display: none;
    cursor: pointer;
    margin-left: auto;
    background: none;
    border: none;
    svg {
      font-size: 30px;
      color: #fff;
    }
    @media (max-width: 1050px) {
      display: block;
    }
  }
`;
export const FooterStyle = styled.section``;

export const LayoutStyle = styled.section`
  button.slick-arrow.slick-prev {
    left: -12px;
    z-index: 9;
  }
  button.slick-arrow.slick-next {
    right: -12px;
    z-index: 9;
  }
  button.slick-arrow {
    background: #000;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    display: flex !important;
    align-items: center;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  }
  .slick-prev:before,
  .slick-next:before {
    font-size: 40px;
    transform: none;
    margin-top: 6px;
    opacity: 1;
  }

  .page_404 {
    padding: 2.5rem 0;
    background-color: #fff;
    font-family: serif;
    margin-top: 2.5rem;
  }

  .row {
    display: flex;
    justify-content: center;
  }

  .col-sm-12,
  .col-sm-10 {
    width: 100%;
  }

  .col-sm-10 {
    max-width: 83.3333%;
    margin: 0 auto;
  }

  .text-center {
    text-align: center;
  }

  .four_zero_four_bg {
    background-image: url("https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 24rem; /* 96 */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .four_zero_four_bg h1 {
    font-size: 6rem; /* Tailwind's text-8xl = 6rem */
  }

  .contant_box_404 {
    margin-top: -50px;
  }

  .contant_box_404 h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .contant_box_404 p {
    margin-bottom: 1rem;
  }

  .link_404 {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #16a34a; /* green-600 */
    color: #fff;
    text-decoration: none;
    border-radius: 4px;
  }
`;
