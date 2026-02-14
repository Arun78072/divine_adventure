import BannerSection from "@/components/Home/Banner";
import Blogs from "@/components/Home/Blogs";
import Countries from "@/components/Home/Countries";
import ExploreSection from "@/components/Home/ExploreSection";
import GridBlog from "@/components/Home/GridBLog";
import Guestpage from "@/components/Home/Guestpage";
import HolidayBanner from "@/components/Home/HolidayBanner";
import InstagramGallery from "@/components/Home/InstagramGallery";
import Teamsection from "@/components/Home/Teamsection";
import TourPackage from "@/components/Home/TourPackage";
import VideoTour from "@/components/Home/Videotour";
import Loader from "@/components/Loader";

import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  
  
  return (
    <main>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <>
          <BannerSection />
         
          <VideoTour />
          <TourPackage
            category={1}
            title={"Divine Adventure Trending Tour Packages"}
          />
          <TourPackage
            category={2}
            title={"Divine Adventure Special Tour Packages"}
          />
          <TourPackage
            category={3}
            title={"Divine Adventure New Tour Packages"}
          />
          <Blogs />
          <GridBlog />
          <HolidayBanner />
          <Countries />
          <ExploreSection />
          <Guestpage />
          <Teamsection />
          {/* <InstagramGallery />  */}
        </>
      )}
      {/*  Hero */}
    </main>
  );
}
