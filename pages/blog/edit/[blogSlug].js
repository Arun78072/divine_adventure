import Loader from "@/components/Loader";
import api from "@/utils";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CreatEditBlog from "./CreatEditBlog";

export default function EditBlog() {
  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { destinationBlog } = router.query;

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
    if(!localStorage.getItem('token')){
      return
    }
    if (destinationBlog) {
      if(destinationBlog == 'create'){
        return
      }else{
        // getTourDetailsApi(destinationBlog);
      }
    }
  }, [destinationBlog]);

  return (
    <div>
  
      <Loader loading={loading} />
      <CreatEditBlog data={postData} />
    </div>
  );
}
