"use client";
import React, { useState } from "react";
import styled from "styled-components";
import DialogBox from "../DialogBox";
import ContactForm from "../Form/ContactUsForm";

const tours = [
  {
    id: 101,
    title: "Kashmir Tour Packages",
    locations: "Srinagar - Gulmarg - Pahalgam - and Sonmarg",
    price: "INR 59999/-",
    note: "Flights and Taxes are extra",
    video: "/videos/kashmir.mp4", // Add your video here
  },
  {
    id: 102,
    title: "Amarnath Tour Packages",
    locations: "Amarnath Cave",
    price: "INR 39999/-",
    note: "Flights and Taxes are extra",
    video: "/videos/Amarnath.mp4",
  },
  {
    id: 103,
    title: "Kedarnath Tour Packages",
    locations:
      "Kedarnath Temple - Vasuki Tal - Shankaracharya Samadhi - Agastyamuni",
    price: "INR 49999/-",
    note: "Flights and Taxes are extra",
    video: "/videos/Kedarnath.mp4",
  },
];

export default function VideoTour() {
  const [formBox, setFormBox] = useState(false);
  return (
    <>
      <Section className="container">
        <div className="grid">
          {tours.map((tour) => (
            <div className="card" key={tour.id}>
              <video
                className="video"
                src={tour.video}
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="content">
                <h2>{tour.title}</h2>
                <p className="locations">{tour.locations}</p>
                <div className="price-box">
                  <p className="from">Starting From</p>
                  <p className="price">{tour.price}</p>
                  <p className="per-head">Per Head</p>
                </div>
                <p className="note">{tour.note}</p>
                <button className="book-btn" onClick={()=>{setFormBox(true)}}>Query Now</button>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <DialogBox open={formBox} onClose={()=>{setFormBox(!formBox)}}>
        <ContactForm />
      </DialogBox>
    </>
  );
}

const Section = styled.section`
  padding: 20px 20px;
  background: #fff;

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .card {
    position: relative;
    height: 415px;
    overflow: hidden;
    border-radius: 2px;
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.15);
  }

  .video {
    width: 100%;
    height: 100%;
    object-fit: fill; /* Shows full video */
  }

  .content {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    color: #fff;
    padding: 25px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-shadow: 1px 1px 2px #000;
    background: transparent;
  }

  h2 {
    font-size: 22px;
    font-weight: 700;
    color: #fff;
  }

  .locations {
    font-size: 14px;
    margin: 8px 0 20px;
  }

  .price-box {
    background: #ffd700;
    padding: 10px;
    text-align: center;
    border-radius: 8px;
    color: #000;
    margin-bottom: 10px;
    font-weight: bold;

    .from {
      font-size: 12px;
    }
    .price {
      font-size: 20px;
    }
    .per-head {
      font-size: 12px;
    }
  }

  .note {
    font-size: 12px;
    margin-bottom: 10px;
  }

  .book-btn {
    background: #ff5a00;
    color: #fff;
    padding: 10px 16px;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s;

    // &:hover {
    //   background: #e14a00;
    // }
  }
`;
