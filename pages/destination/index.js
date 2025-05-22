import { CiCalendarDate, CiFilter } from "react-icons/ci";
import { useEffect, useState } from "react";
import { baseUrl } from "@/utils";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";

import { useSession } from "next-auth/react";
import Loader from "@/components/Loader";
import CreateEditSpark from "@/components/Form/CreateEditSpark";
import { useRouter } from "next/router";
import Image from "next/image";
import { IoLocationOutline } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";

export default function AllSparks() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [activeScreen, setActiveScreen] = useState("my_spark");
  const [editFormData, setEditFormData] = useState({});

  return (
    <main className="destination_section">
      <Loader loading={loading} />

      <section className="container">
        <div className="max-w-screen-lg mx-auto min-h-[60vh]">
          <h1 className="font-semibold ml-6 text-3xl">All Tours Card </h1>
          <Link className="red-500 duration-200" href="/destination/view/00000">
            Single Tour
          </Link>

          {/* Filter Bar  */}
          <h1>Filter Bar</h1>

          {/* All Tour Post */}
          <div className="post_grid">
            {[1, 1, 1, 1, 1, 1]?.map((item, index) => {
              return (
                <div className="post_card" key={index}>
                  <div className="image_wrapper">
                    <Image
                      src={
                        "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      }
                      alt={"title"}
                      width={300}
                      height={300}
                      className="post_image"
                    />
                  </div>
                  <div className="info-row">
                    <span className="icon">
                      <CiCalendarDate /> 8 Days
                    </span>
                    <span className="icon">
                      <IoLocationOutline /> 3 Locations
                    </span>
                  </div>
                  <Link
                    href={`/posts/view/${item?._id}`}
                    className="post_title"
                  >
                    Switzerland
                  </Link>
                  <div className="location_row">
                    <IoLocationOutline />
                    India
                  </div>
                  <h3 className="price">
                    <FaRupeeSign /> 12000
                  </h3>
                  <p className="post_description">
                    Lorem Ipsum has been the industry's standard dummy text ever
                    since the 1500s, when an unknown printer took a galley of
                    type and scrambled it to make a type specimen book.
                  </p>
                  <div className="action_buttons">
                    <button className="secandary_button">Query Form</button>
                    <button className="primary_button">Explore Now</button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="">Pagination bar</div>
        </div>
      </section>

      {activeScreen === "my_spark" ? (
        "ghhhh"
      ) : activeScreen === "add_spark" ? (
        <CreateEditSpark
          data={editFormData}
          handleClose={(res) => {
            if (activeScreen === "add_spark") {
              setPosts([res, ...posts]);
              setActiveScreen("my_spark");
            }
          }}
        />
      ) : (
        ""
      )}
    </main>
  );
}
