import React from "react";
import { BannerSection, LeftContent, RightForm } from "./Banner.styles";
import ContactForm from "../Form/ContactUsForm";
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
        <ContactForm />
      </RightForm>
    </BannerSection>
  );
}
