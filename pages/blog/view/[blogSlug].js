import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "@/utils";
import Image from "next/image";
import { LuIndianRupee } from "react-icons/lu";
import Loader from "@/components/Loader";
import { DestinationStyle } from "@/styles/destination.style";
import TourBookForm from "@/pages/destination/view/TourBookForm";

export default function ViewBlog() {
  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { blogSlug } = router.query;

  const getTourDetailsApi = async (url) => {
    setLoading(true);
    try {
      const response = await api.get(`/api/blog/blog_get_by_id?blogId=${url}`);
      if (response.status == 200) {
        const data = response.data.data;
        setPostData(data);
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
    if (blogSlug) {
      getTourDetailsApi(blogSlug);
    }
  }, [blogSlug]);
  return (
    <>
      <Loader loading={loading} />
      <DestinationStyle>
       

        <div className="container view_section">
          <div className="left_section">
            <h1 className="tour_title">{postData?.title}</h1>
            <Image
              src={postData?.coverImage}
              width={0}
              height={0}
              sizes="100vw"
              alt="Banner"
              className="tour_image"
            />

            <div
              dangerouslySetInnerHTML={{ __html: postData?.description }}
              className="removed_default_css"
            ></div>
          </div>

          <div className="right_section">
            <div className="booking_form">
              <TourBookForm />
            </div>
          </div>
        </div>
      </DestinationStyle>
    </>
  );
}
