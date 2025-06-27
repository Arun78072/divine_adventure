import { TourPackageStyle } from "@/styles/home.style";
import api from "@/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Loader from "../Loader";
import { toast } from "react-toastify";

export default function TourPackage({category}) {
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState([]);

  const settings = {
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

  const getTourDetailsApi = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `/api/tour/tour_get_by_category?categoryId=${category}`
      );
      if (response.status == 200) {
        const data = response.data.data;
        setPostData([...data,...data,...data,...data]);
      }
    } catch (e) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTourDetailsApi();
  }, []);
  return (
    <>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <TourPackageStyle className="container">
          <h2>SOTC Trending Tour Packages</h2>
          <p>
            Tired of browsing through travel agencies and trying to find the
            best package around your dream destination?
          </p>
          <div className="tour_slider">
          {postData.length>0 &&<Slider {...settings}>
              {postData?.map((item, index) => (
                <Link href={`destination/view/${item._id}`}>
                  <div key={index} className="slider_card">
                    <img src={item.coverImage} alt={item.title} />
                    <div className="card_content">
                      <h3>{item.title}</h3>
                      <span>Starting Price</span>
                      <h4>{item.price}</h4>
                    </div>
                  </div>
                </Link>
              ))}
            </Slider> }
            
          </div>
        </TourPackageStyle>
      )}
    </>
  );
}
