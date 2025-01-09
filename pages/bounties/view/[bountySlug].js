import Router, { useRouter } from "next/router";
import { BiDislike, BiLike, BiSolidEdit } from "react-icons/bi";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { baseUrl, formateDate } from "@/utils";
import axios from "axios";
import Loader from "@/components/Loader";
import { useSession } from "next-auth/react";
import { RiDeleteBinFill } from "react-icons/ri";
import ConfirmationBox from "@/components/ConfirmationBox";
import DialogBox from "@/components/DialogBox";
import Link from "next/link";
import Image from "next/image";

export default function ViewBounty() {
  const [bountyData, setBountyData] = useState({});
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [confirmationBox, setConfirmationBox] = useState(false);
  const [submitSparkBox, setSubmitSparkBox] = useState(false);
  const router = useRouter();
  const { bountySlug } = router.query;

  const getBountyDetailsApi = async (url) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${baseUrl}/api/bounty/bounty?bountyId=${url}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 200) {
        const data = response.data;
        setBountyData({ ...data.data.bounty, user: data.data.user });
      } else {
        toast.error("Something went wrong");
      }
    } catch (e) {
      console.log("eee ==>", e?.response?.data);
      if (e?.response?.data?.error == "User not authenticated") {
        toast.error("User not authenticated");
        router.push("/");
      } else if (e?.response?.data?.error == "Bounty Not Available") {
        toast.error("Invalid Bounty");
        router.push("/bounties");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const submitSpark = async (e) => {
    e.preventDefault();
    const sparkId = e.target.elements.sparkId.value;
    setLoading(true);
    try {
      const response = await axios.post(
        `${baseUrl}/api/bounty/submit_spark`,
        { sparkId, bountyId: bountyData._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 200) {
        setBountyData({
          ...bountyData,
          sparks: [...bountyData.sparks, response.data.data],
        });
        toast.success("Successfully submit spark");
        setSubmitSparkBox(false);
      }
    } catch (e) {
      if (e?.response?.data?.error) {
        toast.error(e?.response?.data?.error);
      } else {
        toast.error("Something went wrong");
      }
      //   router.push("/");
    } finally {
      setLoading(false);
    }
  };

  const acceptSpark = async (sparkId) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${baseUrl}/api/bounty/accept_spark`,
        { sparkId, bountyId: bountyData._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 200) {
        setBountyData({
          ...bountyData,
          status: "INACTIVE",
        });
        toast.success("Successfully submit spark");
        setSubmitSparkBox(false);
      }
    } catch (e) {
      if (e?.response?.data?.error) {
        toast.error(e?.response?.data?.error);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Delete Spark
  const handleDelete = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/bounty/delete_bounty`,
        {
          bounty_id: bountyData._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response?.data?.bountyDelete) {
        toast.success("Successfully Delete Bounty");
        router.push("/bounties");
      } else {
        toast.error("Something went wrong");
      }
      setConfirmationBox(false);
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (bountySlug) {
      getBountyDetailsApi(bountySlug);
    }
  }, [bountySlug]);
  return (
    <main>
      {/* Confirmation box for delete spark */}
      <ConfirmationBox
        open={confirmationBox}
        title={"Are you sure to delete this Bounty"}
        handleClick={() => {
          handleDelete();
        }}
        handleClose={() => setConfirmationBox(false)}
      />

      {/* DialogBox for show box for submit spark */}
      <DialogBox open={submitSparkBox}>
        <form onSubmit={submitSpark}>
          <h3>Spark ID</h3>
          <input
            type="text"
            name="sparkId"
            className="w-full p-2 rounded-lg block my-2 border border-solid border-black"
            placeholder="enter spark id to submit for this bounty"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setSubmitSparkBox(false);
              }}
              className="mt-auto py-2 w-full px-4 font-medium text-sm border rounded-[8px] text-black bg-gray-100 hover:bg-gray-200 lg:text-medium "
            >
              Cancle
            </button>
            <button
              type="submit"
              className="mt-auto  w-full py-2 px-4 font-medium text-sm border rounded-[8px] text-white bg-black hover:bg-gray-800 lg:text-medium"
            >
              Submit
            </button>
          </div>
        </form>
      </DialogBox>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <section className="w-full mt-32 my-5 max-w-screen-lg mx-auto p-4">
          <div className="flex items-center justify-end gap-2 mb-3 mt-5">
            {bountyData?.user?.image ? (
              <Image
                src={bountyData?.user?.image}
                alt={bountyData?.user?.name}
                width={60}
                height={60}
                className="rounded-full w-[60px] h-[60px]"
              />
            ) : (
              <span className="rounded-full w-[60px] h-[60px] flex items-center justify-center bg-gray-200">
                {bountyData?.user?.name.charAt(0)}
              </span>
            )}

            <h4 className="mr-auto">{bountyData?.user?.name}</h4>
            {session?.user?.id === bountyData?.user?._id && (
              <>
                <button
                  onClick={() => {
                    bountyData.sparks.length > 0
                      ? toast.error("Now you can't update Bounty")
                      : router.push(`/bounties/edit/${bountyData._id}`);
                  }}
                  className="text-xl"
                >
                  <BiSolidEdit />
                </button>

                <button
                  className="text-red-500 text-xl"
                  onClick={() => {
                    setConfirmationBox(true);
                  }}
                >
                  <RiDeleteBinFill />
                </button>
              </>
            )}

            <span className="flex items-center gap-2 ">
              <AiOutlineDollarCircle /> {bountyData?.amount}
            </span>
            <span className="block text-[18px] bg-gray-400 rounded-md px-2 py-1 text-black">
              Status : {bountyData.status == "ACTIVE" ? "Open" : "Close"}
            </span>
          </div>

          <h1 className="font-medium lg:text-6xl text-4xl my-3">
            {bountyData?.title}
          </h1>
          <span className="block text-right mb-5">
            Created At : {formateDate(bountyData.createdAt)}
          </span>

          <div className="removed_default_css"> {bountyData?.description}</div>

          <section className="w-full my-5">
            <div className="max-w-screen-lg mx-auto min-h-[60vh]">
              <div className="flex gap-3 items-center mt-5 justify-between">
                {bountyData.status == "ACTIVE" ? (
                  <>
                    {" "}
                    <h3 className="ml-6 text-xl font-medium">
                      Sparks Submitted for this Bounty
                    </h3>
                    <button
                      onClick={() => {
                        setSubmitSparkBox(true);
                      }}
                      className="mt-auto w-fit py-2 px-4 font-medium text-sm border rounded-[8px] text-white bg-black hover:bg-gray-800 lg:text-medium"
                    >
                      Submit Spark
                    </button>
                  </>
                ) : (
                  <h3 className="ml-6 text-xl font-medium">
                    Submitted Sparks List
                  </h3>
                )}
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white mt-5">
                  <thead>
                    <tr className="">
                      <th className="text-left py-2 px-4">Title</th>
                      <th className="text-left py-2 px-4">Votes</th>
                      <th className="text-left py-2 px-4">Comment</th>
                      <th className="text-left py-2 px-4">Date Added</th>
                      {session?.user?.id === bountyData?.user?._id &&
                        bountyData.status == "ACTIVE" && (
                          <th className="text-left py-2 px-4">Action</th>
                        )}
                    </tr>
                  </thead>
                  <tbody>
                    {bountyData.sparks?.map((row, ix) => (
                      <tr key={ix} className="border-b">
                        <td className="text-left py-2 px-4">
                          <Link href={`/posts/view/${row.spark._id}`}>
                            {row?.spark.title}
                          </Link>
                        </td>

                        <td className="text-left py-2 px-4">
                          {row?.spark.voteCount || 0}{" "}
                        </td>
                        <td className="text-left py-2 px-4">
                          {row?.spark.commentCount || 0}
                        </td>
                        <td className="text-left py-2 px-4">
                          {formateDate(row.dateAdded)}
                        </td>
                        {session?.user?.id === bountyData?.user?._id &&
                          bountyData.status == "ACTIVE" && (
                            <td className="text-left py-2 px-4">
                              <button
                                className="bg-gray-400 text-black py-2 px-3 rounded-lg text-base font-medium"
                                onClick={() => acceptSpark(row.spark._id)}
                              >
                                Accept
                              </button>
                            </td>
                          )}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {bountyData.sparks?.length == 0 ? (
                  <h1 className="text-center mt-3">No Spark Found</h1>
                ) : (
                  ""
                )}
              </div>
            </div>
          </section>
        </section>
      )}
    </main>
  );
}
