import Loader from "@/components/Loader";
import { DestinationStyle } from "@/styles/destination.style";
import api from "@/utils";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function TourBookForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    people: "",
    message: "",
  });
  const [formError, setFormError] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    people: "",
    message: "",
  });
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
    if (
      !formData.people ||
      isNaN(formData.people) ||
      Number(formData.people) <= 0
    ) {
      error.people = "Please enter a valid number of people";
    }
    if (formData.message && formData.message.trim().length < 10) {
      error.message = "Message should be at least 10 characters (optional)";
    }
    setFormError(error);
    return Object.keys(error).length === 0;
  };

  const handleOnSubmit = async() => {
    setLoading(true)
    if(!checkValidation()){
      toast.error('Fill all the required fields')
      setLoading(false)
      return
    }
    try{
      const response = await api.post("/api/form/tour_book", {...formData,formType : 'Query Regarding Tour',url : window.location.href},);
      console.log('response=====>',response.data)
      if(response.data.success){
        toast.success('Query sent. We’ll get back to you shortly!');
        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
          people: "",
          message: "",
        })
        setFormError({})
      }
    }catch(e){
      console.log('error=>',e)
    }finally{
      setLoading(false)
    }
  };
  return (
    <DestinationStyle>

    <Loader loading={loading} />

      <div>
        <h2>Book This Tour</h2>
        <p>
          Ex optio sequi et quos praesentium in nostrum labore nam rerum iusto
          aut magni nesciunt? Quo quidem neque iste expedita est dolo.
        </p>

        {/* Name Field */}
        <input
          type="text"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Name"
        />
        {formError?.name && <span className="error">{formError.name}</span>}

        {/* Email Field */}
        <input
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          placeholder="Email"
        />
        {formError?.email && <span className="error">{formError.email}</span>}

        {/* Phone Number Field */}
        <input
          type="number"
          value={formData.phoneNumber}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }))
          }
          placeholder="Phone"
        />
        {formError?.phone && <span className="error">{formError.phone}</span>}

        {/* People Count Field */}
        <input
          type="number"
          value={formData.people}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, people: e.target.value }))
          }
          placeholder="Number of people"
        />
        {formError?.people && <span className="error">{formError.people}</span>}

        {/* Message Field */}
        <textarea
          value={formData.message}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, message: e.target.value }))
          }
          placeholder="Message"
        />
        {formError?.message && (
          <span className="error">{formError.message}</span>
        )}

        <button className="primary_button" onClick={()=>handleOnSubmit()}>
          Book Now
        </button>
      </div>
    </DestinationStyle>
  );
}
