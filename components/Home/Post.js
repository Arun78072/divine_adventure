import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { FaRupeeSign } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";

export default function Post() {
  const [postData, setPostData] = useState([
    {
      id: 1,
      title: "dummy",
      likeCount: "677",
      image:
        "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 1,
      title: "dummy",
      likeCount: "677",
      image:
        "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 1,
      title: "dummy",
      likeCount: "677",
      image:
        "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ]);
  return (
    <section className="container">
      <div className="post_section">
        {/* Topic */}

        <h2 className="category_title">Our Trending Tour Packages</h2>

        <div className="post_grid">
          {postData?.map((item, index) => {
            return (
              <div className="post_card" key={index}>
                <div className="image_wrapper">
                  <Image
                    src={item?.image || ""}
                    alt={item?.title}
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
                <Link href={`/posts/view/${item?._id}`} className="post_title">
                  Switzerland
                </Link>
                <div className="location_row">
                  <IoLocationOutline />
                  India
                </div>
                <h3 className="price"><FaRupeeSign /> 12000</h3>
                <p className="post_description">
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book.
                </p>
              <div className="action_buttons">

              <button className="secandary_button">Query Form</button>
              <button className="primary_button">Explore Now</button>
              </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
