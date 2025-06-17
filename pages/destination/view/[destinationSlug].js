import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api, { baseUrl, nestReplies } from "@/utils";
import axios from "axios";
import Image from "next/image";

import InformationTab from "./InformationTab";
import GalleryTab from "./GalleryTab";
import LocationTab from "./LocationTab";
import TourPlanTab from "./TourPlanTab";
import DestinationStyle from "../../../styles/destination.style";
import Loader from "@/components/Loader";

export default function ViewPost() {
  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Information");

  const router = useRouter();
  const { postSlug } = router.query;

  const { destinationSlug } = router.query;

  console.log("destinationSlug =======>", destinationSlug);
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

  let tabContent;
  if (activeTab === "Information") {
    tabContent = <InformationTab data={postData} />;
  } else if (activeTab === "Tour Plan") {
    tabContent = <TourPlanTab data={postData} />;
  } else if (activeTab === "Location") {
    tabContent = <LocationTab data={postData} />;
  } else if (activeTab === "Gallery") {
    tabContent = <GalleryTab data={postData} />;
  }
  return (
    <>
      <Loader loading={loading} />
      <DestinationStyle>
        <div className="banner_image">
          <Image
            src={postData?.tourInfo?.coverImage}
            width={0}
            height={0}
            sizes="100vw"
            alt="Banner"
            style={{
              width: "100%",
              height: "800px",
              objectFit: "cover",
              objectPosition: "top",
            }}
          />
        </div>

        <div className="container view_section">
          <div className="tab_section">
            {["Information", "Tour Plan", "Location", "Gallery"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${activeTab === tab ? "active" : ""}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="bg-white shadow rounded">{tabContent}</div>
        </div>
      </DestinationStyle>
    </>
  );
}
