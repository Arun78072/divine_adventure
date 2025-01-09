import { CiFilter } from "react-icons/ci";
import { useEffect, useState } from "react";
import { baseUrl } from "@/utils";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";

import { useSession } from "next-auth/react";
import Loader from "@/components/Loader";
import CreateEditSpark from "@/components/Form/CreateEditSpark";
import { useRouter } from "next/router";

export default function AllSparks() {
  const [searchQuery, setSearchQuery] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [activeScreen, setActiveScreen] = useState("my_spark");
  const [editFormData, setEditFormData] = useState({});
  const [searchError, setSearchError] = useState("");
  const { query } = useRouter();
  const router = useRouter();

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/post/all_spark?type=all`, {
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

  const searchSpark = async (value) => {
    console.log("value ====>", value);
    try {
      const response = await axios.post(
        `${baseUrl}/api/post/search_spark`,
        {
          search_query: value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 200) {
        const data = response.data;
        setPosts(data.data);
      } else {
        toast.error("Something went wrong");
      }
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  // When user search
  useEffect(() => {
    if (typeof searchQuery === "string") {
      const trimmedQuery = searchQuery.trim();
      if (trimmedQuery.length < 3 && trimmedQuery.length > 0) {
        setSearchError("Min 3 Characters Required");
        return;
      }
      if (trimmedQuery.length >= 3 || trimmedQuery.length === 0) {
        setSearchError("");
        const searchVal = setTimeout(() => {
          searchSpark(trimmedQuery);
        }, 1000);
        return () => clearTimeout(searchVal);
      }
    }
  }, [searchQuery]);

  useEffect(() => {
    setLoading(true);
    if ("create-spark" in query) {
      setEditFormData({});
      setActiveScreen("add_spark");
    } else {
      setActiveScreen("my_spark");
    }
    setLoading(false);
  }, [query]);

  return (
    <main className="p-3">
      <Loader loading={loading} />

      {activeScreen === "my_spark" ? (
        <section className="w-full mt-32 my-5">
          <div className="max-w-screen-lg mx-auto min-h-[60vh]">
            <h1 className="font-semibold ml-6 text-3xl">All Sparks</h1>
            <div className="flex gap-3 items-center mt-5">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                className="grow border p-2 rounded-lg"
                placeholder="Search sparks..."
              />
              {/* <button className="flex items-center border rounded-lg p-2 ">
                <CiFilter /> Filter
              </button> */}
              <button
                onClick={() => {
                  router.push("/posts/sparks?create-spark");
                  setActiveScreen("add_spark");
                }}
                className="mt-auto w-fit py-2 px-4 font-medium text-sm border rounded-[8px] text-white bg-black hover:bg-gray-800 lg:text-medium"
              >
                Create Spark
              </button>
            </div>
            <p className="text-red-500 ml-2">{searchError}</p>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white mt-5">
                <thead>
                  <tr className="">
                    <th className="text-left py-2 px-4">Title</th>
                    <th className="text-left py-2 px-4">Votes</th>
                    <th className="text-left py-2 px-4">Comments</th>
                    <th className="text-left py-2 px-4">Views</th>
                  </tr>
                </thead>
                <tbody>
                  {posts?.map((row, ix) => (
                    <tr key={ix} className="border-b">
                      <td className="text-left py-2 px-4">
                        <Link href={`/posts/view/${row._id}`}>{row.title}</Link>
                      </td>
                      <td className="text-left py-2 px-4">
                        {row?.likeCount || 0}{" "}
                      </td>
                      <td className="text-left py-2 px-4">
                        {row?.commentCount || 0}
                      </td>
                      <td className="text-left py-2 px-4">{row?.views || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {posts.length == 0 ? (
                <h1 className="text-center mt-3">No Spark Found</h1>
              ) : (
                ""
              )}
            </div>
          </div>
        </section>
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
