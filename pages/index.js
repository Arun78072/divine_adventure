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
import { toast } from "react-toastify";

export default function Home() {
  const [postData, setPostData] = useState([]);
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
  useEffect(() => {
    setLoading(true);
    getAllPosts();
  }, []);
  return (
    <main>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <>
          <section className="w-full">
            <div className="max-w-screen-lg flex-1 flex justify-center h-[470px] mx-auto lg:h-[700px] lg:items-center">
              {/* Heading & Button */}
              <div className="flex flex-col justify-center items-center w-[570px] p-6 lg:block  xl:w-[700px]">
                <h2 className="mb-10 text-center mt-6  text-3xl font-semibold md:text-4xl md:mt-8 lg:text-6xl lg:text-left">
                  Spark, Evolve, Conquer: Path to Personal Excellence
                </h2>
                <h3 className="text-center text-xl mb-5 md:text-2xl lg:text-left">
                  In this engaging blog, embark on a transformative adventure to
                  uncover the secrets of self-inspiration and empowerment.
                </h3>
                <div>
                  <button className="font-medium border rounded-3xl text-white bg-black py-2.5 px-3.5 hover:bg-gray-800">
                    Subscribe
                  </button>
                </div>
              </div>
              {/* Hero image */}
              <div>
                <Image
                  src={popularPost?.image || ""}
                  alt={popularPost?.title}
                  width={445}
                  height={374}
                  className="object-cover h-full w-[445px] h-[500px] rounded-xl hidden lg:block"
                />
              </div>
            </div>
          </section>

          {/* ======================  Dynamic section ================== */}
          <section className="w-full">
            <div className="max-w-screen-lg mx-auto mt-8">
              {/* Topic */}
              <div className="flex justify-center items-center lg:justify-between">
                <h2 className="font-medium text-3xl text-center">
                  Popular Sparks
                </h2>
              </div>
              {/* Articles */}
              <div className="grid place-items-center py-3 md:grid-cols-2 lg:pt-8 lg:grid-cols-3">
                {postData?.map((item, index) => {
                  return (
                    <div className="grid gap-2.5 w-80 h-[579px]" key={index}>
                      {/* Image */}
                      <div className="mx-auto">
                        <Image
                          src={item?.image || ""}
                          alt={item?.title}
                          width={308}
                          height={374}
                          className="object-cover w-[308px] h-[374px] rounded-xl"
                        />
                      </div>

                      {/* Heading */}
                      <Link
                        href={`/posts/view/${item?._id}`}
                        className="text-2xl h-24 hover:text-gray-400 duration-200"
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 3,
                          overflow: "hidden",
                        }}
                      >
                        {item?.title}
                      </Link>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <span className="text-[#747474] text-xl">
                            <AiOutlineLike />
                          </span>
                          {item.likeCount}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#ff0000] text-xl">
                            <AiOutlineDislike />
                          </span>{" "}
                          {item.disLikeCount}
                        </div>
                        <div className="flex items-center gap-2">
                          <AiOutlineDollarCircle />
                        </div>
                      </div>
                      {/* Date */}
                      <p className="text-sm text-gray-400">
                        {formateDate(item.createdAt)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Latest */}
          {/* <section className="w-full">
        <div className="max-w-screen-lg mx-auto mt-8">
          <div className="flex justify-center items-center lg:justify-start">
            <h2 className="font-medium text-3xl text-center">Latest</h2>
          </div>
          <div className="grid place-items-center gap-5 grid-cols-1 py-3 px-2  md:grid-cols-2 lg:px-0">
            <div className="flex gap-3">
              <div>
                <img
                  className="w-[297px] h-[170px] object-cover rounded-xl"
                  src="/assets/85b7e887ae3f58196304869664939482.png"
                  alt=""
                />
              </div>
              <div className="grid gap-3 content-center">
                <div className="flex items-center justify-center w-max bg-gray-200 text-[9px] px-1.5 py-0.5 rounded-md text-gray-400">
                  Self-improvement
                </div>
                <Link
                  href="/this-is-the-dummy-blog-page"
                  className="font-medium hover:text-gray-400 duration-200 w-48"
                >
                  Journey to self-understanding: embracing yourself
                </Link>
                <div className="text-[9px] text-gray-400">
                  December 25, 2023
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <div>
                <img
                  className="w-[297px] h-[170px] object-cover rounded-xl"
                  src="/assets/5ecbb1ef866851d709a6c925ac05e9d6.png"
                  alt=""
                />
              </div>
              <div className="grid gap-3 content-center">
                <div className="flex items-center justify-center w-max bg-gray-200 text-[9px] px-1.5 py-0.5 rounded-md text-gray-400">
                  Work-life balance
                </div>
                <Link
                  href="/this-is-the-dummy-blog-page"
                  className="font-medium hover:text-gray-400 duration-200 w-48"
                >
                  Thriving in equilibrium: navigating the work-life balance
                </Link>
                <div className="text-[9px] text-gray-400">March 22, 2023</div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
          <section className="w-full bg-custom1 mt-28 lg:h-[318px]">
            <div className="max-w-screen-lg mx-auto">
              <div className="flex justify-center p-10 lg:grid-cols-2 lg:p-0 lg:justify-between">
                {/* Text & button */}
                <div className="text-center grid grid-cols-1 gap-4 content-center lg:text-left lg:gap-5">
                  <div className="text-lg font-medium lg:text-[40px]">
                    Subscribe for more
                  </div>
                  <div className="text-md text-gray-400 lg:w-96 lg:text-xl">
                    {` Don't miss the opportunity to delve deeper into the subjects you
                care about.`}
                  </div>
                  <div>
                    <button className="font-medium text-sm border rounded-3xl text-white bg-black py-2.5 px-3.5 hover:bg-gray-800 lg:text-medium">
                      Subscribe
                    </button>
                  </div>
                </div>
                {/* Image */}
                <div>
                  <Image
                    src="/assets/0008e29291bcbe9e7f44dd8b802451e6.png"
                    alt="indoor pool "
                    height={318}
                    width={506}
                    className="hidden flex 2-[506px] h-[318px] object-cover lg:flex"
                  />
                </div>
              </div>
            </div>
          </section>
        </>
      )}
      {/*  Hero */}
    </main>
  );
}
