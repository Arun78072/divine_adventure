import { baseUrl } from "@/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function MySpark() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/post/my_sparks`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status == 200) {
        const data = response.data;
        setPosts(data.data.reverse());
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
          <div className="grid place-items-center py-3 md:grid-cols-2 lg:pt-8 lg:grid-cols-3">
            {posts?.map((item, index) => {
              return (
                <div className="grid gap-2.5 w-80 h-[500px]" key={index}>
                  <div className="mx-auto">
                    <Image
                      src={item?.image || ''}
                      alt={item?.title}
                      width={308}
                      height={374}
                      className="object-cover w-[308px] h-[374px] rounded-xl"
                    />
                  </div>

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
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
