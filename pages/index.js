import BannerSection from "@/components/Banner";
import Loader from "@/components/Loader";
import { baseUrl, formateDate } from "@/utils";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AiOutlineDislike,
  AiOutlineDollarCircle,
  AiOutlineLike,
} from "react-icons/ai";
import { CiCalendarDate } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { toast } from "react-toastify";

export default function Home() {
  const [postData, setPostData] = useState([
    {
      id: 1,
      title: "dummy",
      likeCount: "677",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-2wldxk7xXvslja4xSQCxdWR9qc9kg5zWKA&s",
    },
    {
      id: 1,
      title: "dummy",
      likeCount: "677",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-2wldxk7xXvslja4xSQCxdWR9qc9kg5zWKA&s",
    },
    {
      id: 1,
      title: "dummy",
      likeCount: "677",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-2wldxk7xXvslja4xSQCxdWR9qc9kg5zWKA&s",
    },
  ]);
  const [popularPost, setPopularPost] = useState({});
  const [loading, setLoading] = useState(false);

  const getAllPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${baseUrl}/api/post/all_spark?type=popular`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 200) {
        const data = response.data.data;
        const [firstPost, ...restPosts] = data;
        setPostData(restPosts);
        setPopularPost(firstPost);
      } else {
        toast.error("Something went wrong");
      }
    } catch (e) {
      console.log("Error fetching posts:", e);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  // useEffect(() => {
  //   setLoading(true);
  //   getAllPosts();
  // }, []);
  return (
    <main>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <>
          <BannerSection />
          {/* ======================  Dynamic section ================== */}
          <section className="w-full">
            <div className="max-w-screen-lg mx-auto mt-8">
              {/* Topic */}
              <div className="flex justify-center items-center lg:justify-between">
                <h2 className="font-medium text-3xl text-center w-full">
                  Our Trending Tour Packages 
                </h2>
              </div>
              
              <div className="grid place-items-center py-3 md:grid-cols-2 lg:pt-8 lg:grid-cols-3">
                {postData?.map((item, index) => {
                  return (
                    <div className="grid gap-2.5 w-80 h-[579px]" key={index}>
                      <div className="mx-auto">
                        <Image
                          src={item?.image || ""}
                          alt={item?.title}
                          width={300}
                          height={300}
                          className="object-cover w-[300px] h-[300px] rounded-xl"
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[#747474] text-xl">
                          <CiCalendarDate />
                        </span>
                        8 Days
                      </div>
                      <Link
                        href={`/posts/view/${item?._id}`}
                        className="text-2xl h-auto hover:text-gray-400 duration-200"
                      >
                        Switzerland
                      </Link>
                      <div className="flex items-center gap-1">
                        <span className="text-[#747474] text-xl">
                          <IoLocationOutline />
                        </span>
                        India
                      </div>
                      <p>
                        Lorem Ipsum has been the industry's standard dummy text
                        ever since the 1500s, when an unknown printer took a
                        galley of type and scrambled it to make a type specimen
                        book.
                      </p>
                      <button className="bg-[#f7b5b5] p-[10px] rounded-[8px]">Explore Now</button>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

       
        </>
      )}
      {/*  Hero */}
    </main>
  );
}
