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

export default function CategoryTour() {
  const [loading, setLoading] = useState(false);
  const [allTours, setAllTours] = useState([]);
  const router = useRouter();
  const [categoryId , setCategoryId] = useState('')
  const [pageData , setPageData] = useState({})
  const { categorySlug } = router.query;

  useEffect(() => {
    if (categorySlug) {
        setCategoryId(categorySlug.split("-")[0])
      getPosts(); 
    }
  }, [categorySlug]);

  const getPosts = async () => {
    setLoading(true);
    try {
      const response = await api.post(
        `/api/tour/tour_get_by_category?categoryId=${
          categorySlug.split("-")[0]
        }`
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
  useEffect(()=>{
if(categoryId){
    setPageData(tourTypeOption[0].children.filter((i)=> i.id == categoryId)[0])
}
  },[categoryId])
  console.log('categoryId-====>',pageData)
  return (
    <main className="destination_section">
      <div className="banner_image">
        <Image
          src={pageData.coverImage}
        //   src="/assets/mountain_boy.jpg"
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

      <Loader loading={loading} />

      <section className="container">
        <div>
          <div className="description">
            <h1>{pageData.value}</h1>
            <p>
             {pageData.description}
            </p>
          </div>
        </div>
        <div className="">
          {/* All Tour Post */}
          <TourList>
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
                    <p className="description">{item.tourInfo?.description}</p>
                    <div className="action_buttons">
                      <button className="secandary_button">Book Form</button>
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
          </TourList>
        </div>
      </section>
    </main>
  );
}
