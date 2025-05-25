import { baseUrl, formatTimeAgo } from "@/utils";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { LuSendHorizonal } from "react-icons/lu";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import Loader from "../Loader";
import ConfirmationBox from "../ConfirmationBox";
import Image from "next/image";

export default function CommentBox({ commentData, deleteRecord }) {
  const [replyBoxOpen, setReplyBoxOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [replyString, setReplyString] = useState("");
  const [confirmationBox, setConfirmationBox] = useState(false);
  const [messageData, setMessageData] = useState({});
  const [deleteCommentData, setDeleteCommentData] = useState({
    id: "",
    type: "",
  });
  //  const { data: session } = useSession();;

  useEffect(() => {
    if (commentData) {
      setMessageData(commentData);
    }
  }, [commentData]);

  const addReplyApi = async () => {
    if (replyString.length < 2) {
      toast.warning("Reply is too short.");
      return;
    }
    setLoading(true);
    try {
      const { _id: commentId, postId } = messageData;
      const response = await axios.post(
        `${baseUrl}/api/post/add_comment_reply`,
        { postId, commentId, replyString },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 200) {
        setMessageData((prev) => ({
          ...prev,
          reply: [...prev.reply, { ...response.data.data, user: session.user }],
        }));
        setReplyString("");
      } else {
        toast.error("Something went wrong");
      }
    } catch (e) {
      console.error("Error adding reply:", e);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const likeComment = async (id, type) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/post/like_comment`,
        { commentId: id },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 200) {
        if (type == "comment") {
          setMessageData((prev) => ({
            ...prev,
            isLiked: !prev.isLiked,
            likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
          }));
        } else {
          setMessageData((prev) => ({
            ...prev,
            reply: prev.reply.map((item) =>
              item._id === id
                ? {
                    ...item,
                    isLiked: !item.isLiked,
                    likeCount: item.isLiked
                      ? item.likeCount - 1
                      : item.likeCount + 1,
                  }
                : item
            ),
          }));
        }
      } else {
        toast.error("Something went wrong");
      }
    } catch (e) {
      console.error("Error liking comment:", e);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (id, type) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/post/delete_comment?commentId=${id}&type=${type}`,
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 200) {
        if (type === "reply") {
          setMessageData((prev) => ({
            ...prev,
            reply: prev.reply.filter((i) => i._id !== id),
          }));
        } else {
          deleteRecord(id);
        }
      } else {
        toast.error("Something went wrong");
      }
    } catch (e) {
      console.error("Error deleting comment:", e);
      toast.error("Something went wrong");
    } finally {
      setDeleteCommentData({
        id: "",
        type: "",
      });
      setConfirmationBox(false);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <div className="border-b border-dashed border-gray-400 my-4 py-4">
          <div className="flex items-center gap-2 my-1">
            <Image
              src={messageData?.user?.image}
              alt={messageData?.user?.name}
              width={40}
              height={40}
              className="rounded-full w-[40px] h-[40px]"
            />

            <h4 className="mr-auto font-bold">{messageData?.user?.name}</h4>
            {session.user.id !== messageData.user?._id && (
              <button
                className="cursor-pointer text-blue-900"
                onClick={() => likeComment(messageData._id, "comment")}
              >
                {messageData.isLiked ? <AiFillLike /> : <AiOutlineLike />}
              </button>
            )}
          </div>
          <div className="ml-11 flex items-start justify-between">
            <p>{messageData?.comment}</p>
            {(messageData?.user?._id === session.user.id ||
              messageData?.user?.id === session.user.id) && (
              <button
                className="text-red-500 text-lg"
                onClick={() => {
                  setDeleteCommentData({
                    id: messageData._id,
                    type: "comment",
                  });
                  setConfirmationBox(true);
                }}
              >
                <MdDelete />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 ml-11">
            <span className="text-sm font-semibold">
              {formatTimeAgo(messageData.updatedAt)}
            </span>
            <span className="text-sm font-semibold">
              {messageData?.likeCount || 0} Likes
            </span>
            <button
              className="px-4 py-[2px] rounded-md text-blue-600 font-semibold"
              onClick={() => setReplyBoxOpen((prev) => !prev)}
            >
              Reply
            </button>
            <span
              className="ml-auto text-blue-600 font-semibold cursor-pointer"
              onClick={() => setReplyBoxOpen((prev) => !prev)}
            >
              {messageData?.reply?.length || 0} Response
            </span>
          </div>
          {replyBoxOpen && (
            <div className="ml-6 mr-6">
              {messageData?.reply?.map((reply) => (
                <div className="mt-4" key={reply._id}>
                  <div className="flex gap-2 my-1 items-center">
                    <Image
                      src={reply?.user?.image}
                      alt={reply?.user?.name}
                      width={40}
                      height={40}
                      className="rounded-full w-[40px] h-[40px]"
                    />

                    <h4 className="mr-auto font-bold">{reply.user.name}</h4>
                    {session.user.id !== reply?.user?._id && (
                      <button
                        onClick={() => likeComment(reply._id, "reply")}
                        className="cursor-pointer text-blue-900"
                      >
                        {reply.isLiked ? <AiFillLike /> : <AiOutlineLike />}
                      </button>
                    )}
                  </div>
                  <div className="ml-11 flex items-start justify-between">
                    <p>{reply?.comment}</p>
                    {(reply?.user?._id === session.user.id ||
                      reply?.user?.id === session.user.id) && (
                      <button
                        className="text-red-500 text-lg"
                        onClick={() => {
                          setDeleteCommentData({
                            id: reply._id,
                            type: "reply",
                          });
                          setConfirmationBox(true);
                        }}
                      >
                        <MdDelete />
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-11">
                    <span className="text-sm font-semibold">
                      {formatTimeAgo(reply.updatedAt)}
                    </span>
                    <span className="text-sm font-semibold">
                      {reply?.likeCount || 0} Likes
                    </span>
                  </div>
                </div>
              ))}

              <div className="border flex items-center gap-2 rounded-lg pr-2 mt-4">
                <input
                  type="text"
                  className="p-2 grow rounded-xl"
                  value={replyString}
                  placeholder="Reply To This Comment ..."
                  onChange={(e) => setReplyString(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addReplyApi()}
                />
                <button
                  className="text-xl text-[#828282]"
                  onClick={addReplyApi}
                >
                  <LuSendHorizonal />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      <ConfirmationBox
        open={confirmationBox}
        title={"Are you sure to delete this Spark"}
        handleClick={() => {
          deleteComment(deleteCommentData.id, deleteCommentData.type);
        }}
        handleClose={() => setConfirmationBox(false)}
      />
    </>
  );
}
