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
import { RiDeleteBinFill } from "react-icons/ri";
import ConfirmationBox from "../ConfirmationBox";
import { TourGrid } from "@/styles/destination.style";

export default function MyTours() {
  const [allTours, setAllTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [confirmationBox, setConfirmationBox] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTour = async (id) => {
    setLoading(true);
    try {
      const response = await api.post(`/api/tour/delete_tour?tour_id=${id}`);
      if (response.status == 200) {
        setAllTours((item) => item.filter((i) => i._id != id));
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
      setConfirmationBox(false);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <div>
          <div className="top_bar">
            <h1>All Tours</h1>
            <Link href={`/destination/edit/create`} className="primary_button">
              Create New Tour
            </Link>
          </div>
          <TourGrid>
            <div className="post_grid">
              {allTours?.map((item, index) => {
                return (
                  <div className="post_card" key={index}>
                    <button
                      className="delete_button"
                      onClick={() => {
                        setDeleteId(item._id);
                        setConfirmationBox(true);
                      }}
                    >
                      <RiDeleteBinFill />
                    </button>
                    <div className="image_wrapper">
                      <Image
                        src={item.tourInfo.coverImage}
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
                        <IoLocationOutline /> {item.tourInfo.travelCity}{" "}
                        Locations
                      </span>
                    </div>
                    <h3 className="card_title"> {item.tourInfo.title}</h3>
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
          </TourGrid>
        </div>
      )}

      <ConfirmationBox
        open={confirmationBox}
        title={"Are you sure to delete this Spark"}
        handleClick={() => {
          handleDeleteTour(deleteId);
        }}
        handleClose={() => setConfirmationBox(false)}
      />
    </>
  );
}
