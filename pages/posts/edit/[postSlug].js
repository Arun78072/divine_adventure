import CreateEditSpark from "@/components/Form/CreateEditSpark";
import Loader from "@/components/Loader";
import { baseUrl } from "@/utils";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function EditPost() {
  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
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
      } else {
        toast.error("Something went wrong");
      }
    } catch (e) {
      if (e?.response?.data?.error == "User not authenticated") {
        toast.error("User not authenticated");
      } else {
        toast.error("Something went wrong");
      }
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postSlug) {
      getSparkDetailsApi(postSlug);
    }
  }, [postSlug]);

  return (
    <div>
      {/* Loader === */}
      <Loader loading={loading} />

      <CreateEditSpark data={postData} />
    </div>
  );
}
