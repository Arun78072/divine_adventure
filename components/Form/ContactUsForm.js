import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "@/utils";
import PhoneInput from "react-phone-number-input";
import countryData from "../JsonData/AllCountry";
import { ContactFormStyle } from "@/styles/contactForm.style";
import Loader from "../Loader";
export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    country: "",
    message: "",
  });

  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);

  const checkValidation = () => {
    let error = {};
    if (!formData.name || formData.name.trim().length < 3) {
      error.name = "Name must be at least 3 characters";
    }
    if (!formData.country || formData.country.trim().length < 2) {
      error.country = "Country is Required";
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
  
  const setValue = (e) => {
    setFormData({ ...formData, phoneNumber: e });
  };

  return (
    <>
      <Loader loading={loading} />
      <ContactFormStyle>
        <input
          type="text"
          name="name"
          placeholder="Name *"
          value={formData.name}
          onChange={handleChange}
        />
        {formError.name && <p className="error">{formError.name}</p>}

        <PhoneInput
          name="phoneNumber"
          placeholder="Enter phone number *"
          value={formData.phoneNumber}
          onChange={setValue}
        />
        {formError.phoneNumber && (
          <p className="error">{formError.phoneNumber}</p>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email *"
          value={formData.email}
          onChange={handleChange}
        />
        {formError.email && <p className="error">{formError.email}</p>}

        <select
          name="country"
          onChange={handleChange}
          defaultValue=""
          placeholder="Select Country You are from"
        >
          <option disabled value="">
            Select Country You are from
          </option>
          {countryData.map((i, idx) => (
            <option key={idx} value={i.name}>
              {i.name}
            </option>
          ))}
        </select>

        {formError.country && <p className="error">{formError.country}</p>}

        <textarea
          name="message"
          placeholder="Any Message "
          value={formData.message}
          onChange={handleChange}
          rows="4"
          cols="50"
        ></textarea>

        <button onClick={() => handleOnSubmit()}>Submit</button>
      </ContactFormStyle>
    </>
  );
}
