import { baseUrl } from "@/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../Loader";

export default function CreateEditTour({ data }) {
  const [loading, setLoading] = useState(false);
  const [editFormId, setEditFormId] = useState();
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    tour: {
      tourTitle: "",
      tourDescription: "",
      tourPrice: "",
    },
    travel: {
      travelDays: "",
      travelCountry: "",
      travelCity: "",
      travelNight: "",
    },
    meals: {
      breakfast: "",
      lunch: "",
      dinner: "",
    },
    tripMap: "",
  });

  const SubmitTour = async () => {
    try {
      console.log('formData ======>',formData)
      setLoading(true);
      const payload = { ...formData};
      // const payload = { ...formData, id: editFormId };
      const response = await axios.post(
        `${baseUrl}/api/post/add_tour`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        toast.success("Tour saved successfully");
      } else {
        toast.error("Something went wrong");
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      toast.error("Error while saving tour");
    }
  };

  useEffect(() => {
    if (data) {
      setFormData(data);
      setEditFormId(data._id);
    }
  }, [data]);

  return (
    <div>
      <Loader loading={loading} />
      <section className="w-full mt-32 my-5">
        <div className="max-w-screen-lg mx-auto">
          <h1 className="font-semibold ml-6 text-3xl">Create / Edit Tour</h1>
          <div className="flex flex-col gap-6 p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <div>
                <label>Tour Name</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2 rounded-lg border border-black my-2"
                  placeholder="Main title of the tour"
                />
              </div>

              {/* Tour Section */}
              <div>
                <label>Tour Title</label>
                <input
                  type="text"
                  value={formData.tour?.tourTitle}
                  onChange={(e) => setFormData({
                    ...formData,
                    tour: { ...formData.tour, tourTitle: e.target.value },
                  })}
                  className="w-full p-2 rounded-lg border border-black my-2"
                />
              </div>
              <div>
                <label>Tour Description</label>
                <textarea
                  value={formData.tour?.tourDescription}
                  onChange={(e) => setFormData({
                    ...formData,
                    tour: { ...formData.tour, tourDescription: e.target.value },
                  })}
                  className="w-full p-2 rounded-lg border border-black my-2"
                />
              </div>
              <div>
                <label>Tour Price</label>
                <input
                  type="text"
                  value={formData.tour?.tourPrice}
                  onChange={(e) => setFormData({
                    ...formData,
                    tour: { ...formData.tour, tourPrice: e.target.value },
                  })}
                  className="w-full p-2 rounded-lg border border-black my-2"
                />
              </div>

              {/* Travel Section */}
              <div>
                <label>Travel Days</label>
                <input
                  type="text"
                  value={formData.travel?.travelDays}
                  onChange={(e) => setFormData({
                    ...formData,
                    travel: { ...formData.travel, travelDays: e.target.value },
                  })}
                  className="w-full p-2 rounded-lg border border-black my-2"
                />
              </div>
              <div>
                <label>Travel Country</label>
                <input
                  type="text"
                  value={formData.travel?.travelCountry}
                  onChange={(e) => setFormData({
                    ...formData,
                    travel: { ...formData.travel, travelCountry: e.target.value },
                  })}
                  className="w-full p-2 rounded-lg border border-black my-2"
                />
              </div>
              <div>
                <label>Travel City</label>
                <input
                  type="text"
                  value={formData.travel?.travelCity}
                  onChange={(e) => setFormData({
                    ...formData,
                    travel: { ...formData.travel, travelCity: e.target.value },
                  })}
                  className="w-full p-2 rounded-lg border border-black my-2"
                />
              </div>
              <div>
                <label>Travel Night</label>
                <input
                  type="text"
                  value={formData.travel?.travelNight}
                  onChange={(e) => setFormData({
                    ...formData,
                    travel: { ...formData.travel, travelNight: e.target.value },
                  })}
                  className="w-full p-2 rounded-lg border border-black my-2"
                />
              </div>

              {/* Meals */}
              <div>
                <label>Breakfast</label>
                <input
                  type="text"
                  value={formData.meals?.breakfast}
                  onChange={(e) => setFormData({
                    ...formData,
                    meals: { ...formData.meals, breakfast: e.target.value },
                  })}
                  className="w-full p-2 rounded-lg border border-black my-2"
                />
              </div>
              <div>
                <label>Lunch</label>
                <input
                  type="text"
                  value={formData.meals?.lunch}
                  onChange={(e) => setFormData({
                    ...formData,
                    meals: { ...formData.meals, lunch: e.target.value },
                  })}
                  className="w-full p-2 rounded-lg border border-black my-2"
                />
              </div>
              <div>
                <label>Dinner</label>
                <input
                  type="text"
                  value={formData.meals?.dinner}
                  onChange={(e) => setFormData({
                    ...formData,
                    meals: { ...formData.meals, dinner: e.target.value },
                  })}
                  className="w-full p-2 rounded-lg border border-black my-2"
                />
              </div>

              {/* Trip Map */}
              <div className="col-span-2">
                <label>Trip Map</label>
                <input
                  type="text"
                  value={formData.tripMap}
                  onChange={(e) => setFormData({ ...formData, tripMap: e.target.value })}
                  className="w-full p-2 rounded-lg border border-black my-2"
                />
              </div>
            </div>

            <button
              className="mt-4 w-fit py-2 px-4 font-medium text-sm border rounded-[8px] text-white bg-black hover:bg-gray-800 lg:text-medium"
              onClick={SubmitTour}
            >
              Save changes
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
