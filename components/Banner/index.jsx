import Image from "next/image";
import React from "react";

export default function BannerSection() {
  return (
    <div className="pt-36 max-w-screen-lg mx-auto">
      <Image
        src="/assets/banner/image1.jpg"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }} 
      />
    </div>
  );
}
