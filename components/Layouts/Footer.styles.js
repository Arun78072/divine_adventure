import styled from "styled-components";

export const FooterWrapper = styled.footer`
  background-color: #0b3b36;
  color: white;
  padding: 60px 40px 30px;
  border-top-left-radius: 12px;
  margin-top:30px;
 @media (max-width: 500px){
  padding: 28px 10px;
 }
 .contact_details {
    > div {
      display: flex;
      align-items: center;
      gap: 6px;
      a {
        color: #fff;
        text-decoration: none;
      }
      a:hover {
        color: #0065ff;
      }
    }
   
  }

`;

export const FooterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 80px;
  @media (max-width : 1024px){
    flex-direction:column;
  }
`;

export const FooterBrand = styled.div`
  flex: 1;
  min-width: 250px;

  h2 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 12px;
  }

  p {
    font-size: 14px;
    line-height: 1.6;
    max-width: 300px;
  }

  .social-icons {
    margin-top: 16px;
    display: flex;
    gap: 16px;

    a {
      color: white;
      font-size: 18px;
      transition: 0.3s;

      &:hover {
        color: #ffc107;
      }
    }
  }

  .back-to-top {
  color: white;
    margin-top: 30px;
    display: inline-block;
    border: 1px solid white;
    padding: 8px 16px;
    font-size: 14px;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: 4px;
    transition: 0.3s;

    &:hover {
      background: white;
      color: #0b3b36;
    }
  }
    
 
`;



export const FooterLinks = styled.div`
  display: flex;
  gap: 60px;
  flex: 2;
  min-width: 300px;
  justify-content: space-between;
  @media (max-width:768px){
    gap:10px;
    flex-direction: column;
  }
  .column {
    min-width: 150px;

    h4 {
      font-size: 16px;
      margin-bottom: 12px;
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        margin-bottom: 8px;

        a {
          color: white;
          font-size: 14px;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
            
          }
        }
      }
    }
  }
`;

export const FooterBottom = styled.div`
  background: #e6a100;
  color: #000;
  text-align: center;
  padding: 12px;
  font-size: 13px;
  margin-top: 40px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;
