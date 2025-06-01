import CreateEditSpark from "@/components/Form/CreateEditSpark";
import Loader from "@/components/Loader";
import api from "@/utils";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function EditPost() {
  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { destinationSlug } = router.query;

  const getTourDetailsApi = async (url) => {
    setLoading(true);
    try {
      const response = await api.get(`/api/tour/tour_get_by_id?tourId=${url}`);
      if (response.status == 200) {
        const data = response.data.data;
        setPostData(data);
      } 
    } catch (e) {
      if (e?.response?.data?.error == "User not authenticated") {
        toast.error("User not authenticated");
      } else {
        toast.error("Invalid Tour Id");
      }
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (destinationSlug) {
      if(destinationSlug == 'create'){
        return
      }else{
        getTourDetailsApi(destinationSlug);
      }
    }
  }, [destinationSlug]);

  return (
    <div>
      <Loader loading={loading} />
      <CreateEditSpark data={postData} />
    </div>
  );
}
