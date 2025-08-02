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
          {/* <Category /> */}
          <TourPackage category={1} title={'Divine Adventure Trending Tour Packages'}/>
          <TourPackage category={2} title={'Divine Adventure Special Tour Packages'}/>
          <TourPackage category={3} title={'Divine Adventure New Tour Packages'}/>
          <Blogs />
          <GridBlog />
          <HolidayBanner />
          <Countries/>
          {/* <ExploreSection>
          <div className="explore_section">
            <div>
              <Image
                src="/assets/mountains.jpg"
                width={0}
                height={0}
                sizes="100vw"
              />
              <div className="explore_content">
                <h1>Explore Nature</h1>
                <button className="secandary_button">View Packages</button>
              </div>
            </div>
            <div>
              <Image
                src="/assets/jaipur_city.jpg"
                width={0}
                height={0}
                sizes="100vw"
              />{" "}
              <div className="explore_content">
                {" "}
                <h1>Explore Cities</h1>
                <button className="secandary_button">View Packages</button>
              </div>
            </div>
          </div>
          </ExploreSection> */}
          <ExploreSection />
          <Guestpage />
          <Teamsection />
          {/* <Review /> */}
          {/* <InstagramGallery />  */}
         
        </>
      )}
      {/*  Hero */}
    </main>
  );
}
