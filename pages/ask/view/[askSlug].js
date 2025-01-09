import Router, { useRouter } from "next/router";
import { BiDislike, BiLike, BiSolidEdit } from "react-icons/bi";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineDollarCircle,
} from "react-icons/ai";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  baseUrl,
  copyToClipboard,
  formateDate,
  formatTimeAgo,
  nestReplies,
} from "@/utils";
import axios from "axios";
import Loader from "@/components/Loader";
import { AiOutlineLike } from "react-icons/ai";
import { FaHeart, FaRegCopy } from "react-icons/fa";
import { LuSendHorizonal } from "react-icons/lu";
import { useSession } from "next-auth/react";
import CommentBox from "@/components/CommentBox";
import { RiDeleteBinFill } from "react-icons/ri";
import ConfirmationBox from "@/components/ConfirmationBox";
import DialogBox from "@/components/DialogBox";
import Link from "next/link";
import Image from "next/image";

export default function ViewPost() {
  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const [comments, setComments] = useState([]);
  const [confirmationBox, setConfirmationBox] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [messageString, setMessageString] = useState("");
  const [tipBox, setTipBox] = useState(false);
  const router = useRouter();
  const { askSlug } = router.query;

  if (status === "unauthenticated") {
    router.back();
  }

  const getAskQuestionDetailsApi = async (url) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${baseUrl}/api/ask/question?questionId=${url}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 200) {
        const data = response.data;
        setPostData({ ...data.data.question });
        setComments(data.data.answer);
      } else {
        toast.error("Something went wrong");
      }
    } catch (e) {
      if (e?.response?.data?.error == "User not authenticated") {
        toast.error("User not authenticated");
        router.push("/");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  // For Like Dislike All actions
  const handleAction = async (endpoint, type, id) => {
    setButtonDisabled(true);
    try {
      const response = await axios.post(
        `${baseUrl}/api/post/like_dislike_action`,
        { endpoint, type, id },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        let newPostData = { ...postData };
        switch (endpoint) {
          case "add_actions":
            if (type === "Like") {
              newPostData.isLiked = true;
              newPostData.likeCount = Number(postData.likeCount) + 1;
            } else {
              newPostData.isDisliked = true;
              newPostData.disLikeCount = Number(postData.disLikeCount) + 1;
            }
            break;
          case "update_actions":
            if (type === "Like") {
              newPostData.isLiked = true;
              newPostData.likeCount = Number(postData.likeCount) + 1;
              newPostData.isDisliked = false;
              newPostData.disLikeCount = postData.disLikeCount - 1;
            } else {
              newPostData.isLiked = false;
              newPostData.likeCount = postData.likeCount - 1;
              newPostData.isDisliked = true;
              newPostData.disLikeCount = Number(postData.disLikeCount) + 1;
            }
            break;
          case "delete_actions":
            if (type === "Like") {
              newPostData.isLiked = false;
              newPostData.likeCount = postData.likeCount - 1;
            } else {
              newPostData.isDisliked = false;
              newPostData.disLikeCount = postData.disLikeCount - 1;
            }
            break;
          default:
            break;
        }

        setPostData(newPostData);
        setLoading(false);
      } else {
        toast.error("Something went wrong");
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      toast.error("Something went wrong");
    } finally {
      setButtonDisabled(false);
    }
  };

  const handleVotes = async (value) => {
    setButtonDisabled(true);
    try {
      const response = await axios.post(
        `${baseUrl}/api/post/handle_vote`,
        { postId: postData._id },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status == 200) {
        setPostData({
          ...postData,
          isVoted: !value,
          voteCount: value ? postData.voteCount - 1 : postData.voteCount + 1,
        });
        // if (!value) {
        //   toast.success("Successfully Add Votes");
        // }
      }
    } catch (e) {
      setLoading(false);
      toast.error("Something went wrong");
    } finally {
      setButtonDisabled(false);
    }
  };

  // Comments APIS
  const addCommentApi = async () => {
    if (messageString.trim().length < 2) {
      toast.warning("Message is too short.");
      return;
    }
    setLoading(true);
    try {
      const data = {
        postId: postData._id,
        comment: messageString,
      };
      const response = await axios.post(
        `${baseUrl}/api/ask/add_comment`,
        { ...data },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        const newMessage = {
          ...response.data.data,
          user: session.user,
          reply: [],
        };
        setComments((prevComments) => [newMessage, ...prevComments]);
        setMessageString("");
      } else {
        toast.error("Something went wrong");
      }
    } catch (e) {
      console.error("Error adding comment:", e);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const addTipApi = async (e) => {
    e.preventDefault();
    const amount = e.target.elements.tipAmount.value;
    setLoading(true);
    try {
      const response = await axios.post(
        `${baseUrl}/api/wallet/pay_tip`,
        { amount, sparkId: postData._id, reciverUserId: postData.user._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 200) {
        setPostData({
          ...postData,
          tip: Number(postData.tip) + Number(amount),
        });
        toast.success("Successfully submit spark");
        setTipBox(false);
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

  // Handle Delete Spark

  const handleDelete = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/ask/delete_question`,
        {
          question_id: postData._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response?.data?.questionDelete) {
        toast.success("Successfully Delete Question");
        router.back();
      } else {
        toast.error("Something went wrong");
      }
      setConfirmationBox(false);
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (askSlug) {
      getAskQuestionDetailsApi(askSlug);
    }
  }, [askSlug]);

  return (
    <main>
      {/* Loader === */}

      {/* Confirmation box for delete spark */}
      <ConfirmationBox
        open={confirmationBox}
        title={"Are you sure to delete this Question"}
        handleClick={() => {
          handleDelete();
        }}
        handleClose={() => setConfirmationBox(false)}
      />

      {/* Tip Box  */}
      <DialogBox open={tipBox}>
        <form onSubmit={addTipApi}>
          <h3>Give a Tip</h3>
          <input
            type="number"
            name="tipAmount"
            className="w-full p-2 rounded-lg block my-2 border border-solid border-black"
            placeholder="enter amount to tip"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setTipBox(false);
              }}
              className="mt-auto py-2 w-full px-4 font-medium text-sm border rounded-[8px] text-black bg-gray-100 hover:bg-gray-200 lg:text-medium "
            >
              Cancle
            </button>
            <button
              type="submit"
              className="mt-auto  w-full py-2 px-4 font-medium text-sm border rounded-[8px] text-white bg-black hover:bg-gray-800 lg:text-medium"
            >
              Tip
            </button>
          </div>
        </form>
      </DialogBox>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <section className="w-full mt-32 my-5 max-w-screen-lg mx-auto p-4">
          <div>
            <div className="flex items-center justify-end gap-2 mb-3">
              <Image
                src={postData?.user?.image}
                alt={postData?.user?.name}
                width={40}
                height={40}
                className="rounded-full w-[40px] h-[40px]"
              />

              <h4 className="mr-auto">{postData?.user?.name}</h4>

              {session?.user?.id === postData?.user?._id && (
                <>
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
            </div>

            <div>
              <h1 className="font-medium lg:text-2xl text-4xl">
                Q: {postData?.title}
              </h1>
            </div>

            {postData.bounty?._id ? (
              <div className="mt-24">
                <h2>Attached Bounty Detail</h2>

                <div className="border rounded-lg p-2 my-3">
                  <Link
                    href={`/bounties/view/${postData.bounty?._id}`}
                    className="text-xl"
                  >
                    Title : {postData.bounty?.title}
                  </Link>
                  <p>Created At : {formateDate(postData.bounty.createdAt)}</p>
                </div>
              </div>
            ) : (
              ""
            )}

            {/* ==============   Comment Section start  ==================== */}
            <div className="mt-10">
              <h1 className="my-4">Add Your Answer</h1>
              <div className="border flex items-center gap-2 rounded-lg pr-2">
                <input
                  type="text"
                  className="p-2 grow rounded-xl"
                  value={messageString}
                  placeholder="Add Your Answer ... "
                  onChange={(e) => setMessageString(e.target.value)}
                  onKeyDown={(e) => e.key == "Enter" && addCommentApi()}
                />

                <button
                  className="text-xl text-[#828282]"
                  onClick={() => {
                    addCommentApi();
                  }}
                >
                  <LuSendHorizonal />
                </button>
              </div>

              <div className="mt-10">
                <h2>Answer</h2>
                {comments?.map((item, index) => (
                  <div key={index} className="border rounded-lg p-2 my-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 my-1">
                        <Image
                          src={item?.user?.image}
                          alt={item?.user?.name}
                          width={40}
                          height={40}
                          className="rounded-full w-[40px] h-[40px]"
                        />
                        <h4 className="mr-auto font-bold">
                          {item?.user?.name}
                        </h4>
                      </div>
                      <span className="text-sm font-semibold">
                        {formatTimeAgo(item.updatedAt)}
                      </span>
                    </div>
                    <p>{item?.comment}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ==============   Comment Section end  ==================== */}
          </div>
        </section>
      )}
    </main>
  );
}
