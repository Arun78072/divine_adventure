import { CiFilter } from "react-icons/ci";
import { useEffect, useState } from "react";
import { baseUrl } from "@/utils";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import Loader from "@/components/Loader";
import CreateEditBounty from "@/components/Form/CreateEditBounty";
import { useRouter } from "next/router";

export default function Bounties() {
  const [searchQuery, setSearchQuery] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [activeScreen, setActiveScreen] = useState("my_bounty");
  const [editFormData, setEditFormData] = useState({});
  const [searchError, setSearchError] = useState("");
  const { query } = useRouter();
  const router = useRouter();

  useEffect(() => {
    getBountys();
  }, []);

  const getBountys = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/bounty/all_bounty`, {
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
    if ("create-bounties" in query) {
      setEditFormData({});
      setActiveScreen("add_bounty");
    } else {
      setActiveScreen("my_bounty");
    }
    setLoading(false);
  }, [query]);

  return (
    <main className="p-3">
      <Loader loading={loading} />

      {activeScreen === "my_bounty" ? (
        <section className="w-full mt-32 my-5">
          <div className="max-w-screen-lg mx-auto min-h-[60vh]">
            <h1 className="font-semibold ml-6 text-3xl">Bounties</h1>
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
                  router.push("/bounties?create-bounties");
                  setActiveScreen("add_bounty");
                }}
                className="mt-auto w-fit py-2 px-4 font-medium text-sm border rounded-[8px] text-white bg-black hover:bg-gray-800 lg:text-medium"
              >
                Create Bounty
              </button>
            </div>
            <p className="text-red-500 ml-2">{searchError}</p>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white mt-5">
                <thead>
                  <tr className="">
                    <th className="text-left py-2 px-4">Title</th>
                    <th className="text-left py-2 px-4">Sparks</th>
                    <th className="text-left py-2 px-4">Amount</th>
                    <th className="text-left py-2 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {posts?.map((row, ix) => (
                    <tr key={ix} className="border-b">
                      <td className="text-left py-2 px-4">
                        <Link href={`/bounties/view/${row._id}`}>
                          {row.title}
                        </Link>
                      </td>

                      <td className="text-left py-2 px-4">
                        {row?.sparks.length || 0}
                      </td>
                      <td className="text-left py-2 px-4">
                        {row?.amount || 0}
                      </td>
                      <td className="text-left py-2 px-4">
                        {row?.status || ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {posts.length == 0 ? (
                <h1 className="text-center mt-3">No Bounty Found</h1>
              ) : (
                ""
              )}
            </div>
          </div>
        </section>
      ) : activeScreen === "add_bounty" ? (
        <CreateEditBounty
          data={editFormData}
          handleClose={(res) => {
            if (activeScreen === "add_bounty") {
              setPosts([res, ...posts]);
              setActiveScreen("my_bounty");
            }
          }}
        />
      ) : (
        ""
      )}
    </main>
  );
}
