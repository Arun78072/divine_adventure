import { CountriesStyle } from "@/styles/home.style";
import tourTypeOption from "@/components/JsonData/TourType.json"

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

export default function Countries() {
  const [data, setData] = useState([]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  useEffect(() => {
    if (tourTypeOption) {
      const update = [...tourTypeOption[0].category[0].tours];
      setData(update);
    }
  }, [tourTypeOption]);
  return (
    <CountriesStyle>
      <div className="container">
        <h2 className="title">The Best of World . 240+ Tours , 72 Countries</h2>
        {data.length > 0 && (
          <div className="slider_section">
            {" "}
            <Slider {...settings}>
              {data?.map((item, index) => {
                const slug = item.value
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-+|-+$/g, "");
                return (
                  <Link
                    href={`/indian-tour/${item.id}-${slug}`}
                    className="link_url"
                  >
                    <div key={index} className="slider_card">
                      <img src={item.coverImage} alt={item.value} />
                      <div className="card_content">
                        <h3>{item.value}</h3>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </Slider>
          </div>
        )}
      </div>
    </CountriesStyle>
  );
}
