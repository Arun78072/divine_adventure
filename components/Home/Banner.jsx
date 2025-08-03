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
    "/assets/banner/banner1.jpg",
    "/assets/banner/banner2.jpg",
    "/assets/banner/banner3.jpg",
    "/assets/banner/Madurai_Meenakshi.png",
  ];
  return (
    <BannerSetion>

      <div className="banner_img_section">
        {/* <Image
          src="/assets/banner/sunset.jpg"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "1000px" }}
        /> */}

        <div className="tour_slider home_banner">
        <Slider {...settings}>
          {bannerImages.map((item, index) => (
           <Link href={'/'} key={index}>
           <img src={item} alt={item} className="banner_img" />
           </Link>
          ))}
        </Slider>
      </div>

        {/* <div className="content">
          <h2>No matter where you’re going to, we’ll take you there</h2>
          <div>
            <div className="select_box">
              <select name="where" id="where">
                <option value="" disabled selected>
                  Where To Go ?
                </option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
                <option value="4">Option 4</option>
              </select>
            </div>

            <div className="select_box">
              <select name="where" id="where">
                <option value="" disabled selected>
                  Tour Type ?
                </option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
                <option value="4">Option 4</option>
              </select>
            </div>

            <button className="primary_button">Search</button>
          </div>
        </div> */}
      </div>
      
      {/* ======== Collabration section ======= */}
      <div className="collabration_logo_section">
        <Image
          src="/assets/banner/logo1.png"
          width={0}
          height={0}
          sizes="100vw"
        />
        <Image
          src="/assets/banner/logo2.png"
          width={0}
          height={0}
          sizes="100vw"
        />
        <Image
          src="/assets/banner/logo3.png"
          width={0}
          height={0}
          sizes="100vw"
        />
        <Image
          src="/assets/banner/logo4.png"
          width={0}
          height={0}
          sizes="100vw"
        />
        <Image
          src="/assets/banner/logo5.png"
          width={0}
          height={0}
          sizes="100vw"
        />
      </div>
    </BannerSetion>
  );
}
