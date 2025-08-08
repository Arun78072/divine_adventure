import { BannerSetion } from "@/styles/home.style";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Slider from "react-slick";

export default function BannerSection() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false ,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const bannerImages = [
    // "/assets/banner/banner2.jpg",
    // "/assets/banner/banner3.jpg",
    "/assets/banner/Chardham.jpg",
    "/assets/banner/Dharmshala.jpg",
    "/assets/banner/goaBeach.jpg",
  ];
  return (
    <BannerSetion>
      <div className="banner_img_section">
        <div className="tour_slider home_banner">
        <Slider {...settings}>
          {bannerImages.map((item, index) => (
           <Link href={'/'} key={index}>
           <img src={item} alt={item} className="banner_img" />
           </Link>
          ))}
        </Slider>
      </div>
      </div>
      
     
    </BannerSetion>
  );
}
