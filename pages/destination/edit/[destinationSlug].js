import CreateEditSpark from "@/components/Form/CreateEditSpark";
import Loader from "@/components/Loader";
import api, { baseUrl } from "@/utils";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function EditPost() {
  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(false);
    // const { data: session } = useSession();;
  const router = useRouter();
  const { destinationSlug } = router.query;

  console.log('postSlug =======>',destinationSlug)
  const getTourDetailsApi = async (url) => {
    setLoading(true);
    try {
      const response = await api.get(`/api/tour/tour_get_by_id?tourId=${url}`);
      if (response.status == 200) {
        const data = response.data;
        consol.log('data =========>',data)
        // setPostData({ ...data.data.posts, user: data.data.user });
      } else {
        toast.error("Something went wrong");
      }
    } catch (e) {
      if (e?.response?.data?.error == "User not authenticated") {
        toast.error("User not authenticated");
      } else {
        toast.error("Something went wrong");
      }
      // router.push("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (destinationSlug) {
      getTourDetailsApi(destinationSlug);
    }
  }, [destinationSlug]);

  return (
    <div>
      {/* Loader === */}
      {/* <Loader loading={loading} /> */}

      <CreateEditSpark data={postData} />
    </div>
  );
}
