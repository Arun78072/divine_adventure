import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { baseUrl, nestReplies } from "@/utils";
import axios from "axios";
import Image from "next/image";

import InformationTab from "./InformationTab";
import GalleryTab from "./GalleryTab";
import LocationTab from "./LocationTab";
import TourPlanTab from "./TourPlanTab";

export default function ViewPost() {
  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Information");

  const router = useRouter();
  const { postSlug } = router.query;

  const getSparkDetailsApi = async (url) => {
    setLoading(true);
    try {
      const response = await axios.get(`url`);
      if (response.status === 200) {
        const data = response.data;
        setPostData({ ...data.data.posts, user: data.data.user });
      } else {
        toast.error("Something went wrong");
      }
    } catch (e) {
      toast.error("Error fetching post data");
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  let tabContent;
  if (activeTab === "Information") {
    tabContent = <InformationTab />;
  } else if (activeTab === "Tour Plan") {
    tabContent = <TourPlanTab />;
  } else if (activeTab === "Location") {
    tabContent = <LocationTab />;
  } else if (activeTab === "Gallery") {
    tabContent = <GalleryTab />;
  }

  return (
    <section>
      <div className="banner_image">
        <Image
          src="/assets/mountain_boy.jpg"
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

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Switzerland</h1>

        <div className="flex space-x-4 border-b mb-6">
          {["Information", "Tour Plan", "Location", "Gallery"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 font-semibold transition ${
                activeTab === tab
                  ? "border-b-4 border-blue-500 text-blue-500"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-white shadow rounded">{tabContent}</div>
      </div>
    </section>
  );
}
