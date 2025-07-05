import { CountriesStyle } from "@/styles/home.style";
import { tourTypeOption } from "@/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

export default function Countries() {
  const [data, setData] = useState([]);
  // tourTypeOption
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  useEffect(() => {
    if (tourTypeOption) {
        const update = [...tourTypeOption[0].children , ...tourTypeOption[1].children]
      setData(update);
    }
  }, [tourTypeOption]);
  return (
    <CountriesStyle>
      <div className="container">
      <h2 className="title">The Best of World . 240+ Tours , 72 Countries</h2>
      {data.length > 0 && (
      <div className="slider_section">  <Slider {...settings}>
          {data?.map((item, index) => (
            <Link href={`destination/view/${item._id}`} className="link_url">
              <div key={index} className="slider_card">
                <img src={item.coverImage} alt={item.value} />
                <div className="card_content">
                  <h3>{item.value}</h3>
                </div>
              </div>
            </Link>
          ))}
        </Slider>
        </div>

      )}
      </div>
    </CountriesStyle>
  );
}
