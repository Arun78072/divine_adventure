import Image from "next/image";
import React from "react";

export default function BannerSection() {
  return (
    <div className="banner_section">
      <div className="banner_img_section">
        <Image
          src="/assets/banner/sunset.jpg"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "1000px" }}
        />
        <div className="content">
          <h2>No matter where you’re going to, we’ll take you there</h2>
          <div>
            <div className="select_box">
              <select name="where" id="where">
                <option value="" disabled selected>
                  Where To Go ?
                </option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
                <option value="4">Option 4</option>
              </select>
            </div>

            
            <div className="select_box">
              <select name="where" id="where">
                <option value="" disabled selected>
                  Tour Type ?
                </option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
                <option value="4">Option 4</option>
              </select>
            </div>

            
            <button className="primary_button">Search</button>
          </div>
        </div>
      </div>
      <div className="collabration_logo_section">
      <Image
          src="/assets/banner/logo1.png"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "180px", height: "auto" ,objectFit:'contain'}}
        />
      <Image
          src="/assets/banner/logo2.png"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "180px", height: "auto" ,objectFit:'contain'}}
        />
      <Image
          src="/assets/banner/logo3.png"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "180px", height: "auto" ,objectFit:'contain'}}
        />
      <Image
          src="/assets/banner/logo4.png"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "180px", height: "auto" ,objectFit:'contain'}}
        />
      <Image
          src="/assets/banner/logo5.png"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "180px", height: "auto" ,objectFit:'contain'}}
        />
      </div>
    </div>
  );
}
