import api, { baseUrl } from "@/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../Loader";

export default function CreateEditTour({ data }) {
  const [loading, setLoading] = useState(false);
  const [editFormId, setEditFormId] = useState();
  const [formData, setFormData] = useState({});

  const SubmitTour = async () => {
    try {
      setLoading(true);
      const payload = {
        tourInfo: {
          title: "Masroor Mandir ",
          description: "This is masroor mandir okay ",
          price: 20000,
          destination: "masoor",
          depature: "12 / 10 / ",
          include: ["sb kuch"],
          travelDays: "5",
          travelCountry: "1",
          travelCity: "3",
          travelNight: "6",
        },
        _id: "6839e9d70f6fe09b4b8c2188",
        title: "Tour Name",
        deleted: false,
        tourImage:
          "https://img.freepik.com/free-photo/young-female-traveler-enjoying-rural-surroundings_23-2149125532.jpg?uid=R26337487&ga=GA1.1.1668163620.1737013112&semt=ais_hybrid&w=740",
        status: "PUBLIC",
        tourPlan: [
          {
            title: "tour title",
            description: "tour description ",
            list: [""],
            _id: "6839e9d70f6fe09b4b8c2189",
          },
        ],
        location:
          '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4085.217993504921!2d76.13469897630256!3d32.07276297396586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391b43b22d895a9d%3A0x78c1bd87f3285412!2sMasroor%20Rock-cut%20Temple!5e1!3m2!1sen!2sin!4v1748167152928!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
      };
      const response = await api.post("/api/tour/add_tour", payload);
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
    }
  }, [data]);
  console.log("formData======>", formData);
  return (
    <div className="form_box">
      <Loader loading={loading} />
      <section>
        <div className="container">
          <h1>Create / Edit Tour</h1>
          <div className="form_wrapper">
            <div className="form_grid">
              <div>
                <label>Tour Name</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Main title of the tour"
                />
              </div>
              <div>
                <label>Tour Image URL</label>
                <input
                  type="text"
                  value={formData.tourImage}
                  onChange={(e) =>
                    setFormData({ ...formData, tourImage: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                >
                  <option value="PUBLIC">PUBLIC</option>
                  <option value="INDRAFT">INDRAFT</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </div>
              <div>
                <label>Tour Info Title</label>
                <input
                  type="text"
                  value={formData?.tourInfo?.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tourInfo: { ...formData.tourInfo, title: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <label>Description</label>
                <textarea
                  value={formData?.tourInfo?.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tourInfo: {
                        ...formData.tourInfo,
                        description: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div>
                <label>Price</label>
                <input
                  type="number"
                  value={formData?.tourInfo?.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tourInfo: {
                        ...formData.tourInfo,
                        price: parseFloat(e.target.value),
                      },
                    })
                  }
                />
              </div>
              <div>
                <label>Destination</label>
                <input
                  type="text"
                  value={formData?.tourInfo?.destination}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tourInfo: {
                        ...formData.tourInfo,
                        destination: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div>
                <label>Depature</label>
                <input
                  type="text"
                  value={formData?.tourInfo?.depature}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tourInfo: {
                        ...formData.tourInfo,
                        depature: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div>
                <label>Include In Tour Plan </label>
                <input
                  type="text"
                  value={formData?.tourInfo?.include[0]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tourInfo: {
                        ...formData.tourInfo,
                        include: [e.target.value],
                      },
                    })
                  }
                />
              </div>
              <div>
                <label>Travel Days</label>
                <input
                  type="text"
                  value={formData?.tourInfo?.travelDays}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tourInfo: {
                        ...formData.tourInfo,
                        travelDays: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div>
                <label>Travel Country</label>
                <input
                  type="text"
                  value={formData?.tourInfo?.travelCountry}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tourInfo: {
                        ...formData.tourInfo,
                        travelCountry: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div>
                <label>Travel City</label>
                <input
                  type="text"
                  value={formData?.tourInfo?.travelCity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tourInfo: {
                        ...formData.tourInfo,
                        travelCity: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div>
                <label>Travel Night</label>
                <input
                  type="text"
                  value={formData?.tourInfo?.travelNight}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tourInfo: {
                        ...formData.tourInfo,
                        travelNight: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="col-span-2">
                <label>Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
              </div>
            </div>

            <button onClick={SubmitTour} className="primary_button">
              Save changes
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
