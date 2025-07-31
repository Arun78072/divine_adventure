import React, { useState } from "react";
import {
  BannerSection,
  LeftContent,
  RightForm,
} from "./Banner.styles";
import { toast } from "react-toastify";
import Loader from "../Loader";
import api from "@/utils";

export default function HolidayBanner() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);

  const checkValidation = () => {
    let error = {};
    if (!formData.name || formData.name.trim().length < 3) {
      error.name = "Name must be at least 3 characters";
    }
    if (!formData.email || formData.email.trim().length < 3) {
      error.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      error.email = "Invalid email format";
    }
    if (!formData.phoneNumber || formData.phoneNumber.trim().length < 10) {
      error.phoneNumber = "Phone number is required";
    }
    setFormError(error);
    return Object.keys(error).length === 0;
  };

  const handleOnSubmit = async () => {
    setLoading(true);

    if (!checkValidation()) {
      toast.error("Please correct the highlighted fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/api/form/tour_book", {
        ...formData,
        formType: "General Form",
      });

      if (response.data.success) {
        toast.success("Query sent. We’ll get back to you shortly!");
        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
        });
        setFormError({});
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <BannerSection className="container">
      <Loader loading={loading} />

      <LeftContent>
        <hr />
        <h1>
          PLAN YOUR HOLIDAYS WITH OUR ASSISTANCE,
          <span>JUST FILL IN YOUR DETAILS.</span>
        </h1>
        <hr />
      </LeftContent>

      <RightForm >
        <input
          type="text"
          name="name"
          placeholder="Name *"
          value={formData.name}
          onChange={handleChange}
        />
        {formError.name && <p className="error">{formError.name}</p>}

        <input
          type="tel"
          name="phoneNumber"
          placeholder="Mobile *"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        {formError.phoneNumber && <p className="error">{formError.phoneNumber}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email *"
          value={formData.email}
          onChange={handleChange}
        />
        {formError.email && <p className="error">{formError.email}</p>}

        {/* <div className="checkbox">
          <input type="checkbox" id="agree"  value={formData.checkBox}  onChange={handleChange}/>
          <label htmlFor="agree">
            I hereby accept the <a href="#">Privacy Policy</a> and I authorise the company to contact me.
          </label>
        </div> */}

        <button onClick={()=>handleOnSubmit()}>Submit</button>
      </RightForm>
    </BannerSection>
  );
}
