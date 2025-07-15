import { TourPackageStyle } from "@/styles/home.style";
import api from "@/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Loader from "../Loader";
import { toast } from "react-toastify";
import { MdCurrencyRupee } from "react-icons/md";

export default function TourPackage({category}) {
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState([]);



  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
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
                      <h4><MdCurrencyRupee />{item.price} /-</h4>
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
