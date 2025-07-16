import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import api, { tourTypeOption } from "@/utils";
import Image from "next/image";
import { TourList } from "@/styles/destination.style";
import { CiCalendarDate } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";
import Link from "next/link";
import { toast } from "react-toastify";
import { TourPackageStyle } from "@/styles/home.style";

export default function CategoryTour({ type }) {
  const [loading, setLoading] = useState(false);
  const [allTours, setAllTours] = useState([]);
  const router = useRouter();
  const [categoryId, setCategoryId] = useState("");
  const [pageData, setPageData] = useState({});
  const { categorySlug } = router.query;

  useEffect(() => {
    if (categorySlug) {
      setCategoryId(categorySlug.split("-")[0]);
      getPosts();
    }
  }, [categorySlug]);

  const getPosts = async () => {
    setLoading(true);
    try {
      const response = await api.post(
        `/api/tour/tour_get_by_type?categoryId=${categorySlug.split("-")[0]}`
      );
      if (response.status == 200) {
        const data = response.data;
        setAllTours(data.data.reverse());
      } else {
        toast.error("Something went wrong");
      }
    } catch (e) {
      if (e?.response?.data?.error == "User not authenticated") {
        router.push("/");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (categoryId) {
      const id = categoryId.split("")[0];
      const data =
        type == "indian"
          ? tourTypeOption[0].category[id - 1].tours.filter(
              (i) => i.id == categoryId
            )[0]
          : tourTypeOption[1].category[id - 1].tours.filter(
              (i) => i.id == categoryId
            )[0];
      setPageData(data);
    }
  }, [categoryId]);
  console.log("categoryId-====>", categoryId.split("")[0]);
  return (
    <>
      <Loader loading={loading} />
      {/* allTours */}
      {allTours.length > 0 ? (
        <main className="destination_section">
          <div className="banner_image">
            <Image
              src={pageData?.coverImage}
              // src="/assets/mountain_boy.jpg"
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "100%",
                height: "800px",
                objectFit: "cover",
                objectPosition: "top",
              }}
            />
          </div>
          <section className="container">
            <div>
              <div className="description">
                <h1>{pageData?.value}</h1>
                <p>{pageData?.description}</p>
              </div>
            </div>
            <div className="">
              {/* All Tour Post */}
              <TourList>
                <TourPackageStyle className="container">
                  <div className="tour_slider">
                    {allTours.length > 0 &&
                      allTours?.map((item, index) => (
                        <Link href={`destination/view/${item._id}`}>
                          <div key={index} className="slider_card">
                            <Image
                              src={item?.tourInfo?.coverImage}
                              alt={"title"}
                              width={300}
                              height={300}
                              className="post_image"
                            />

                            {/* <img    src={item?.tourInfo?.coverImage} alt={item.tourInfo?.title} /> */}
                            <div className="card_content">
                              <h3>{item.tourInfo?.title}</h3>
                              <span>Starting Price</span>
                              <h4>{item.tourInfo.price}</h4>
                            </div>
                          </div>

                          <Link
                            href={`/destination/view/${item._id}`}
                            className="button primary_button"
                          >
                            View Tour
                          </Link>
                        </Link>
                      ))}
                  </div>
                </TourPackageStyle>
              </TourList>

              {/* <TourList>
                {allTours?.map((item, index) => {
                  return (
                    <div className="post_card" key={index}>
                      <div className="image_wrapper">
                        <Image
                          src={item?.tourInfo?.coverImage}
                          alt={"title"}
                          width={300}
                          height={300}
                          className="post_image"
                        />
                      </div>
                      <div>
                        <h1>{item.tourInfo?.title}</h1>
                        <div className="info-row">
                          <span className="icon">
                            <CiCalendarDate /> 8 Days
                          </span>
                          <span className="icon">
                            <IoLocationOutline /> 3 Locations
                          </span>
                        </div>
                        <div className="location_row">
                          <IoLocationOutline />
                          India
                        </div>
                        <h3 className="price">
                          <FaRupeeSign /> 12000
                        </h3>
                        <p className="description">
                          {item.tourInfo?.description}
                        </p>
                        <div className="action_buttons">
                          <button className="secandary_button">
                            Book Form
                          </button>
                          <Link
                            href={`/destination/view/${item._id}`}
                            className="post_title primary_button"
                          >
                            View Tour
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </TourList> */}
            </div>
          </section>
        </main>
      ) : (
        <div className="no_data_found">
          <p> No data found</p>
          <Link href='/' className="primary_button">Go Back To Home Page </Link>
        </div>
      )}
    </>
  );
}
