import api, { baseUrl } from "@/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../Loader";
import { MdAdd } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import { useRouter } from "next/router";

export default function CreateEditTour({ data }) {
  const [loading, setLoading] = useState(false);
  const [editFormId, setEditFormId] = useState();
  const [formData, setFormData] = useState({
    status: "PUBLIC",
    tourInfo: {
      title: "",
      description: "",
      price: "",
      country: "",
      destination: "",
      depature: "",
      depatureTime: "",
      returnTime: "",
      include: [""],
      includeText: "",
      notInclude: [""],
      notIncludeText: "",
      travelDays: "",
      travelCountry: "",
      travelCity: "",
      travelNight: "",
      coverImage: "",
    },
    location: {
      note: "",
      address: "",
      locationLink: "",
    },
  });
  const [tourPlan, setTourPlan] = useState([
    {
      title: "",
      description: "",
      locationImage: "",
      list: [],
      listText: "",
    },
  ]);
  const router = useRouter();
  const handleFormChange = (index, key, value) => {
    const update = tourPlan?.map((item, ix) => {
      if (ix === index) {
        return {
          ...item,
          [key]: value,
        };
      } else {
        return item;
      }
    });

    setTourPlan(update); // If this is for `formData`
  };

  const handleUploadImage = async (file, type, index) => {
    try {
      if (!file) return;
      const formData = new FormData();
      formData.append("image", file);

      const response = await api.post("/api/media/upload_image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("data =upload imhg =====>", response);
      if (type == "coverImage") {
        setFormData({
          ...formData,
          tourInfo: {
            ...formData.tourInfo,
            coverImage: response.data.url,
          },
        });
      } else if (type == "tourPlan") {
        setTourPlan((prev) =>
          prev.map((x, y) => {
            if (y === index) {
              return {
                ...x,
                locationImage: response.data.url,
              };
            } else {
              return x;
            }
          })
        );
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  const SubmitTour = async () => {
    try {
      setLoading(true);
      const payload = {
        status: formData?.status || "PUBLIC",
        tourInfo: {
          title: formData?.tourInfo?.title || "",
          description: formData?.tourInfo?.description || "",
          price: formData?.tourInfo?.price || 0,
          country: formData?.tourInfo?.country || "",
          destination: formData?.tourInfo?.destination || "",
          depature: formData?.tourInfo?.depature || "",
          depatureTime: formData?.tourInfo?.depatureTime || "",
          returnTime: formData?.tourInfo?.returnTime || "",
          include: formData?.tourInfo?.include || [""],
          notInclude: formData?.tourInfo?.notInclude || [""],
          travelDays: formData?.tourInfo?.travelDays || "",
          travelCountry: formData?.tourInfo?.travelCountry || "",
          travelCity: formData?.tourInfo?.travelCity || "",
          travelNight: formData?.tourInfo?.travelNight || "",
          coverImage: formData?.tourInfo?.coverImage || "",
        },
        tourPlan: tourPlan.map(({ listText, ...rest }) => ({
          ...rest,
        })),
        location: {
          note: formData?.location?.note || "",
          address: formData?.location?.address || "",
          locationLink: formData?.location?.locationLink || "",
        },
      };
      console.log("payload=========>", payload);
      debugger;
      const response = editFormId
        ? await api.post("/api/tour/edit_tour", { id: editFormId, ...payload })
        : await api.post("/api/tour/add_tour", payload);
      if (response.status == 201) {
        toast.success("Tour saved successfully");
        router.push("/profile");
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
      setTourPlan(data.tourPlan);
      setEditFormId(data?._id);
    }
  }, [data]);
  console.log("tourPlan======>", tourPlan);
  return (
    <div className="form_box">
      <Loader loading={loading} />
      <section>
        <div className="container">
          <h1>Create / Edit Tour</h1>
          <div className="form_wrapper">
            <div className="form_grid">
              <div>
                <label>Tour Status</label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                >
                  <option value="PUBLIC">PUBLIC</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </div>

              <div className="col-span-2">
                <h3>Tour Information Section</h3>
              </div>
              <div className="cover_image">
                <label>Cover Image of Tour</label>
                <input
                  type="file"
                  onChange={(e) =>
                    handleUploadImage(e.target.files?.[0], "coverImage")
                  }
                />
              </div>
              <div>
                {" "}
                {formData?.tourInfo?.coverImage && (
                  <img
                    src={formData?.tourInfo?.coverImage}
                    alt="Cover Preview"
                    style={{
                      width: "300px",
                      marginTop: "10px",
                      borderRadius: "8px",
                    }}
                  />
                )}
              </div>

              <div>
                <label>Name of Tour</label>
                <input
                  type="text"
                  value={formData?.tourInfo?.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tourInfo: {
                        ...formData.tourInfo,
                        title: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <div>
                <label>Description of Tour</label>
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
                <label>Price of Tour (INR)</label>
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
                <label>Destination Locations of Tour</label>
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
                <label>Depature from</label>
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
                <label>Depature Time (Indian Timezone)</label>
                <input
                  type="datetime-local"
                  value={formData?.tourInfo?.depatureTime}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tourInfo: {
                        ...formData.tourInfo,
                        depatureTime: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <div>
                <label>Return Time (Indian Timezone)</label>
                <input
                  type="datetime-local"
                  value={formData?.tourInfo?.returnTime}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tourInfo: {
                        ...formData.tourInfo,
                        returnTime: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <div className="add_multiple_list">
                <label>Include In Tour Plan</label>
                {formData?.tourInfo?.include?.length > 0 && (
                  <ul className="mt-2">
                    {formData.tourInfo.include.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center justify-between mb-1"
                      >
                        <span>{item}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              tourInfo: {
                                ...formData.tourInfo,
                                include: formData.tourInfo.include.filter(
                                  (_, i) => i !== idx
                                ),
                              },
                            });
                          }}
                        >
                          <RiDeleteBinFill />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="input_group">
                  <input
                    type="text"
                    value={formData?.tourInfo?.includeText || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tourInfo: {
                          ...formData.tourInfo,
                          includeText: e.target.value,
                        },
                      })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newItem = formData?.tourInfo?.includeText?.trim();
                      if (!newItem) return;
                      setFormData({
                        ...formData,
                        tourInfo: {
                          ...formData.tourInfo,
                          include: [
                            ...(formData.tourInfo.include || []),
                            newItem,
                          ],
                          includeText: "", // clear input after adding
                        },
                      });
                    }}
                  >
                    <MdAdd />
                  </button>
                </div>
              </div>

              <div className="add_multiple_list">
                <label>Not Include In Tour Plan</label>
                {formData?.tourInfo?.notInclude?.length > 0 && (
                  <ul className="mt-2">
                    {formData.tourInfo.notInclude.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center justify-between mb-1"
                      >
                        <span>{item}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              tourInfo: {
                                ...formData.tourInfo,
                                notInclude: formData.tourInfo.notInclude.filter(
                                  (_, i) => i !== idx
                                ),
                              },
                            });
                          }}
                        >
                          <RiDeleteBinFill />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="input_group">
                  <input
                    type="text"
                    value={formData?.tourInfo?.notIncludeText || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tourInfo: {
                          ...formData.tourInfo,
                          notIncludeText: e.target.value,
                        },
                      })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newItem =
                        formData?.tourInfo?.notIncludeText?.trim();
                      if (!newItem) return;
                      setFormData({
                        ...formData,
                        tourInfo: {
                          ...formData.tourInfo,
                          notInclude: [
                            ...(formData.tourInfo.notInclude || []),
                            newItem,
                          ],
                          notIncludeText: "", // clear input after adding
                        },
                      });
                    }}
                  >
                    <MdAdd />
                  </button>
                </div>
              </div>

             

              <div>
                <label>Travel Days</label>
                <input
                  type="number"
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
                  type="number"
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
                  type="number"
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
                  type="number"
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

              <h3 className="col-span-2"> Full Tour Plan</h3>
              <button
                className="col-span-2 add_button"
                onClick={() => {
                  setTourPlan((i) => [
                    ...i,
                    {
                      title: "",
                      description: "",
                      locationImage: "",
                      list: [],
                    },
                  ]);
                }}
              >
                Add More +
              </button>
              <div className="col-span-2">
                {tourPlan?.map((item, index) => (
                  <div className="form_grid tour_form">
                    <h3> Day {index + 1}</h3>
                    <button
                      className="del_button"
                      onClick={() => {
                        setTourPlan((prev) =>
                          prev.filter((_, ix) => ix !== index)
                        );
                      }}
                    >
                      Delete
                    </button>

                    <div>
                      <label>Title</label>
                      <input
                        type="text"
                        value={item?.title}
                        onChange={(e) =>
                          handleFormChange(index, "title", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label>Image of Location</label>

                      <input
                        type="file"
                        onChange={(e) =>
                          handleUploadImage(
                            e.target.files?.[0],
                            "tourPlan",
                            index
                          )
                        }
                      />

                      {item?.locationImage && (
                        <img
                          src={item?.locationImage}
                          alt="Cover Preview"
                          style={{
                            width: "300px",
                            marginTop: "10px",
                            borderRadius: "8px",
                          }}
                        />
                      )}
                    </div>
                    <div>
                      <label>Description</label>
                      <textarea
                        value={item?.description}
                        onChange={(e) =>
                          handleFormChange(index, "description", e.target.value)
                        }
                      />
                    </div>

                    <div className="add_multiple_list">
                      <label>List of Activity</label>
                      {item?.list?.length > 0 && (
                        <ul className="mt-2">
                          {item?.list.map((it, idx) => (
                            <li
                              key={idx}
                              className="flex items-center justify-between mb-1"
                            >
                              <span>{it}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  setTourPlan((prev) =>
                                    prev.map((x, y) => {
                                      if (y === index) {
                                        return {
                                          ...x,
                                          list: x.list.filter((o) => o != it),
                                        };
                                      } else {
                                        return x;
                                      }
                                    })
                                  );
                                }}
                              >
                                <RiDeleteBinFill />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="input_group">
                        <input
                          type="text"
                          value={item?.listText || ""}
                          onChange={(e) =>
                            setTourPlan((prev) =>
                              prev.map((x, y) => {
                                if (y === index) {
                                  return {
                                    ...x,
                                    listText: e.target.value,
                                  };
                                } else {
                                  return x;
                                }
                              })
                            )
                          }
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newItem = item?.listText?.trim();
                            if (!newItem) return;

                            setTourPlan((prev) =>
                              prev.map((x, y) => {
                                if (y === index) {
                                  return {
                                    ...x,
                                    list: [...(x.list || []), newItem],
                                    listText: "",
                                  };
                                } else {
                                  return x;
                                }
                              })
                            );
                          }}
                        >
                          <MdAdd />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="col-span-2"> Location Section</h3>
              <div>
                <label>Location Address</label>
                <input
                  type="text"
                  value={formData.location?.address}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location: {
                        ...formData.location,
                        address: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <div>
                <label>Google Map Link</label>
                <input
                  type="text"
                  value={formData.location?.locationLink}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location: {
                        ...formData.location,
                        locationLink: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div>
                <label>Location Description </label>
                <textarea
                  value={formData.location?.note}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location: {
                        ...formData.location,
                        note: e.target.value,
                      },
                    })
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
