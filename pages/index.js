import BannerSection from "@/components/Home/Banner";
import Category from "@/components/Home/Category";
import Post from "@/components/Home/Post";
import Review from "@/components/Home/Review";
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
          <Image
            src="/assets/mountain_img.jpg"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
          <Image
            src="/assets/flag.jpg"
            width={0}
            height={0}
            sizes="100vw"
            className="flag_image"
            style={{ width: "100%", height: "auto" }}
          />

          <Post />
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
