import React from "react";
import {
  BannerSection,
  LeftContent,
  RightForm,
} from "./Banner.styles";

export default function HolidayBanner() {
  return (
    <BannerSection className="container">
      <LeftContent>
        <hr />
        <h1>
          PLAN YOUR HOLIDAYS WITH OUR ASSISTANCE,
          <span>JUST FILL IN YOUR DETAILS.</span>
        </h1>
        <hr />
      </LeftContent>

      <RightForm>
        <input type="text" placeholder="Name" />
        <input type="tel" placeholder="Mobile" />
        <input type="email" placeholder="Email" />
        <div className="checkbox">
          <input type="checkbox" id="agree" />
          <label htmlFor="agree">
            I hereby accept the <a href="#">Privacy Policy</a> and I authorise Thomas Cook Group Companies to contact me.
          </label>
        </div>
        <button type="submit">Submit</button>
      </RightForm>
    </BannerSection>
  );
}
