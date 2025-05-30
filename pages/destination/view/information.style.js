import styled from "styled-components";

const Information = styled.div`
  .tour-container {
    padding: 32px;
    font-family: sans-serif;
  }

  .tour-header {
    display: flex;
    justify-content: space-between;
    gap: 32px;
  }

  .left {
    flex: 1;
  }

   h1 {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 12px;
    color: #333;
  }

  p {
    margin-bottom: 12px;
    font-size: 16px;
    line-height: 1.5;
    color: #555;
  }
 p strong {
    color: #DF6951;
    font-weight: 600;
  }
  .price {
    font-size: 20px;
    font-weight: 600;
    color: #DF6951;
  }

  .price span {
    font-size: 14px;
    color: #DF6951;
    margin-left: 4px;
  }

  .reviews {
    font-size: 14px;
    color: #777;
  }

  .description {
    margin-top: 10px;
    font-size: 15px;
    color: #444;
  }


.right {
  max-width: 380px;
  background-color: #f9f9f9;
  padding: 32px;
//   border-radius: 8px;
  font-family: 'Arial', sans-serif;
}

.booking-form h2 {
  font-size: 24px;
  color: #1c2141;
  font-weight: 700;
  margin-bottom: 16px;
  text-align: center;
}

.booking-form p {
  font-size: 14px;
  color: #333;
  line-height: 22px;
  margin-bottom: 20px;
  text-align: center;
}

.booking-form input,
.booking-form textarea {
  width: 100%;
  padding: 14px;
  margin-bottom: 12px;
  border: none;
  background-color: #fff;
  border-radius: 6px;
  font-size: 14px;
  box-shadow: 0 0 0 1px #ddd;
}

.booking-form input::placeholder,
.booking-form textarea::placeholder {
  color: #bbb;
}

.booking-form textarea {
  resize: vertical;
  min-height: 80px;
}

.booking-form .btn {
  width: 100%;
  padding: 12px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 6px;
  margin-bottom: 10px;
  cursor: pointer;
}

.booking-form .btn.primary {
  background-color: #f0673e;
  color: white;
  border: none;
}

.booking-form .btn.secondary {
  background-color: #db4935;
  color: white;
  border: none;
}


  .gallery-section {
  display: flex;
  gap: 50px;
  align-items: flex-start;
  justify-content: space-between;
  padding: 40px 60px;
}

.gallery-left {
  flex: 1;
  max-width: 60%;
}

.gallery-left h2 {
  font-size: 32px;
  font-weight: 700;
  color: #1c2141;
  margin-bottom: 10px;
}

.gallery-left p {
  font-size: 15px;
  color: #333;
  line-height: 1.6;
  margin-bottom: 24px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.gallery-grid img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
}

.gallery-right {
  flex: 1;
  max-width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.gallery-right img {
  max-width: 100%;
  height: auto;
  object-fit: contain;
}

`;

export default Information;
