import Link from "next/link";
import React from "react";

export default function AccessDenied() {
  return (
    <section className="page_404 py-10 bg-white font-serif mt-10">
      <div className="container mx-auto">
        <div className="row flex justify-center">
          <div className="col-sm-12">
            <div className="col-sm-10 text-center">
              <div className="four_zero_four_bg bg-center bg-no-repeat bg-cover h-96" style={{ backgroundImage: "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')" }}>
                <h1 className="text-8xl">404</h1>
              </div>

              <div className="contant_box_404 mt-[-50px]">
                <h3 className="text-2xl mb-4">Look like you're lost</h3>
                <p className="mb-4">the page you are looking for not available!</p>
                <Link href="/" className="link_404 text-white py-2 px-4 bg-green-600 inline-block">Go to Home</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
