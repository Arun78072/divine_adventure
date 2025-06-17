import { TourPackageStyle } from "@/styles/home.style";
import React from "react";
import Slider from "react-slick";

export default function TourPackage() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };
  const slides = [
    {
      title: "Char Dham Yatra by Helicopter",
      img: "https://www.sotc.in/images/sotc_home_page/new-launches/Char-Dham-Yatra-By-Helicopter.jpg",
      price: "₹23,23,000",
    },
    {
      title: "Leh Ladakh Tour",
      img: "https://www.sotc.in/images/sotc_home_page/new-launches/Char-Dham-Yatra-By-Helicopter.jpg",
      price: "₹98,000",
    },
    {
      title: "Kashmir Paradise Getaway",
      img: "https://www.sotc.in/images/sotc_home_page/new-launches/Char-Dham-Yatra-By-Helicopter.jpg",
      price: "₹85,000",
    },
    {
      title: "North East Delight – Gangtok & Darjeeling",
      img: "https://www.sotc.in/images/sotc_home_page/new-launches/Char-Dham-Yatra-By-Helicopter.jpg",
      price: "₹74,999",
    },
    {
      title: "Golden Triangle – Delhi, Agra & Jaipur",
      img: "https://www.sotc.in/images/sotc_home_page/new-launches/Char-Dham-Yatra-By-Helicopter.jpg",
      price: "₹65,000",
    },
    {
      title: "Spiritual South India Tour",
      img: "https://www.sotc.in/images/sotc_home_page/new-launches/Char-Dham-Yatra-By-Helicopter.jpg",
      price: "₹57,500",
    },
    {
      title: "Himachal Hills – Manali & Shimla",
      img: "https://www.sotc.in/images/sotc_home_page/new-launches/Char-Dham-Yatra-By-Helicopter.jpg",
      price: "₹68,000",
    },
  ];
  
  return (
    <TourPackageStyle className="container">
      <h2>SOTC Trending Tour Packages</h2>
      <p>
        Tired of browsing through travel agencies and trying to find the best
        package around your dream destination?
      </p>
      <div className="tour_slider">
      <Slider {...settings}>
  {slides.map((item, index) => (
    <div key={index} className="slider_card">
      <img src={item.img} alt={item.title} />
      <div className="card_content">
        <h3>{item.title}</h3>
        <span>Starting Price</span>
        <h3>{item.price}</h3>
      </div>
    </div>
  ))}
</Slider>

      </div>
    </TourPackageStyle>
  );
}
