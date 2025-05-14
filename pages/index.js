import BannerSection from "@/components/Home/Banner";
import Booking from "@/components/Home/Booking";
import Category from "@/components/Home/Category";
import Post from "@/components/Home/Post";
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

<Booking/>
          <Image
            src="/assets/Sepratir.png"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />

          <Post />
        </>
      )}
      {/*  Hero */}
    </main>
  );
}
