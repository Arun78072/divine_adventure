import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { baseUrl, copyToClipboard, nestReplies } from "@/utils";
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
import Image from "next/image";

export default function ViewPost() {
  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

  const router = useRouter();
  const { postSlug } = router.query;

  const getSparkDetailsApi = async (url) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${baseUrl}/api/post/spark?sparkId=${url}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 200) {
        const data = response.data;

        setPostData({ ...data.data.posts, user: data.data.user });
        setComments(nestReplies(data.data.comment));
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

  return (
    <section>
      <div className="banner_image">
        <Image
          src="/assets/mountain_boy.jpg"
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "100%",
            height: "800px",
            objectFit: "cover",
            objectPosition: "top",
          }}
        />
      </div>
      <div className="container">
        <div className="info_tab">
          <h1>Switzerland</h1>
        </div>

        <div className="tour_tab">
          <h1>Tour section</h1>
        </div>
        <div className="location_tab">
          <h1>Tour section</h1>
        </div>
        <div className="gallery_tab">
          <h1>Tour section</h1>
        </div>
      </div>
    </section>
  );
}
