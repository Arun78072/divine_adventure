import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  BlogSectionWrapper,
  Heading,
  BlogGrid,
  BlogCard,
  BlogImage,
  BlogTitle,
  TourPackageStyle,
} from "./BlogSection.styles";
import { toast } from "react-toastify";
import api from "@/utils";
import Slider from "react-slick";
import { SkeletonLoaderStyle } from "@/styles/skeletonLoader";

export default function Blogs() {
  const [loading, setLoading] = useState(false);
  const [allTours, setAllTours] = useState([]);
  const getAllBlogList = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/blog/all_blog");
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

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,    
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
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
    getAllBlogList();
  }, []);
  return (
    <BlogSectionWrapper className="container">
      <Heading>Reading Corner</Heading>
      <BlogGrid>
        <TourPackageStyle>
          <Slider {...settings}>
            {loading
              ? [1, 1, 1, 1, 1, 1, 1, 1, 1].map((_) => (
                  <SkeletonLoaderStyle>
                    <div className="slider_loader">
                      <span className="title"></span>
                      <span className="title two"></span>
                    </div>
                  </SkeletonLoaderStyle>
                ))
              : allTours.map((blog, index) => (
                  <BlogCard key={index}>
                    <Link href={`blog/view/${blog._id}`}>
                      <BlogImage src={blog.coverImage} alt={blog.title} />
                      <BlogTitle>{blog.title}</BlogTitle>
                    </Link>
                  </BlogCard>
                ))}
          </Slider>
        </TourPackageStyle>

        {/* {allTours.map((blog, index) => (
                  <BlogCard key={index}>
                    <Link href={`blog/view/${blog._id}`}>
                      <BlogImage src={blog.coverImage} alt={blog.title} />
                      <BlogTitle>{blog.title}</BlogTitle>
                    </Link>
                  </BlogCard>
                ))} */}
      </BlogGrid>
    </BlogSectionWrapper>
  );
}
