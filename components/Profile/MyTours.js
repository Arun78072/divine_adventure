import api from "@/utils";
import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";
import { CiCalendarDate } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";
import Image from "next/image";

export default function MyTours() {
  const [allTours, setAllTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const response = await api.get("/api/tour/all_tour");
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
    }
  };
  
  return (
    <>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <div>
          <h1>All Tours</h1>
          <Link href={`/destination/edit/create`}>Create New Tour</Link>
          <div className="post_grid">
            {allTours?.map((item, index) => {
              return (
                <div className="post_card" key={index}>
                  <div className="image_wrapper">
                    <Image
                      src={item.tourImage}
                      alt={"title"}
                      width={300}
                      height={300}
                      className="post_image"
                    />
                  </div>
                  <div className="info-row">
                    <span className="icon">
                      <CiCalendarDate /> {item.tourInfo.travelDays} Days
                    </span>
                    <span className="icon">
                      <IoLocationOutline /> {item.tourInfo.travelCity} Locations
                    </span>
                  </div>
                  <Link
                    href={`/destination/view/${item._id}`}
                    className="post_title"
                  >
                    {item.title}
                  </Link>
                  <div className="location_row">
                    <IoLocationOutline />
                    India
                  </div>
                  <h3 className="price">
                    <FaRupeeSign /> {item.tourInfo.price}
                  </h3>
                  <p className="post_description">
                    {item.tourInfo.description}
                  </p>
                  <div className="action_buttons">
                    <Link
                      href={`/destination/view/${item._id}`}
                      className="post_title secandary_button"
                    >
                      View Tour
                    </Link>
                    <Link
                      href={`/destination/edit/${item._id}`}
                      className="post_title primary_button"
                    >
                      Edit Tour
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
