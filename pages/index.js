import BannerSection from "@/components/Home/Banner";
import Blogs from "@/components/Home/Blogs";
import Category from "@/components/Home/Category";
import Countries from "@/components/Home/Countries";
import HolidayBanner from "@/components/Home/HolidayBanner";
import Review from "@/components/Home/Review";
import TourPackage from "@/components/Home/TourPackage";
import Loader from "@/components/Loader";
import Image from "next/image";

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
          <Category />
          <TourPackage category={1}/>
          <TourPackage category={2}/>
          <TourPackage category={3}/>
          <Blogs />
          <HolidayBanner />
          <Countries/>
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
          <Review />
        </>
      )}
      {/*  Hero */}
    </main>
  );
}
