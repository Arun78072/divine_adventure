import { baseUrl } from "@/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function MyTours() {
  const [allTours, setAllTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    // getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/bounty/my_bounty`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
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
        <button>Create New Tour </button>
          <div className="">
            {allTours?.map((item, index) => {
              return (
                <div
                  className="shadow-custom w-full p-2 rounded-lg my-3"
                  key={index}
                >
                  <Link href={`/bounties/view/${item?._id}`}>
                    <h3 className="text-xl">{item?.title}</h3>
                    <p className="line-clamp-4">{item?.description}</p>
                    <div className="flex gap-2 mt-2">
                      <h3>Total Sparks : {item?.sparks.length}</h3>{" "}
                      <span className="">
                        Status : {item.status == "ACTIVE" ? "Open" : "Close"}
                      </span>
                    </div>
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
