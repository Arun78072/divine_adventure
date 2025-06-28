import api, { baseUrl } from "@/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";
import { MdAdd, MdDelete } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import { useRouter } from "next/router";
import { DestinationStyle } from "@/styles/destination.style";

export default function CreateEditTour({ data }) {
  const [loading, setLoading] = useState(false);
  const [editFormId, setEditFormId] = useState();
  const [formData, setFormData] = useState({
    status: "PUBLIC",
    tourType: "",
    tourTypeId: "",
    tourCountry: "",
    tourCountryId: "",
    tourCategory: "",
    tourCategoryId: "",
    tourInfo: {
      title: "",
      description: "",
      price: "",
      country: "",
      destination: "",
      depature: "",
      include: [],
      includeText: "",
      notInclude: [],
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
  const [galleryImages, setGalleryImages] = useState({
    img: [],
    selectedImg: "",
  });
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
    setLoading(true);
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
      switch (type) {
        case "coverImage":
          setFormData((prev) => ({
            ...prev,
            tourInfo: {
              ...(prev.tourInfo || {}),
              coverImage: response.data.url,
            },
          }));
          break;
      
        case "tourPlan":
          setTourPlan((prev) =>
            prev.map((item, idx) =>
              idx === index ? { ...item, locationImage: response.data.url } : item
            )
          );
          break;
      
        case "galleryImage":
          setGalleryImages((prev) => ({
            ...prev,
            img: [...(prev.img || []), response.data.url],
          }));
          break;
      
        default:
          console.warn(`Unknown upload type: ${type}`);
      }
      
      toast.success("Successful Upload Image");
    } catch (e) {
      console.log("error", e);
      toast.error("Oops! Something went wrong. Please re-upload the image.");
    } finally {
      setLoading(false);
    }
  };

  const SubmitTour = async () => {
    try {
      setLoading(true);
      const payload = {
        status: formData?.status || "PUBLIC",
        tourType: formData?.tourType,
        tourTypeId: formData?.tourTypeId,
        tourCountry: formData?.tourCountry,
        tourCountryId: formData?.tourCountryId,
        tourCategory: formData?.tourCategory,
        tourCategoryId: formData?.tourCategoryId,
        tourInfo: {
          title: formData?.tourInfo?.title || "",
          description: formData?.tourInfo?.description || "",
          price: formData?.tourInfo?.price || 0,
          country: formData?.tourInfo?.country || "",
          destination: formData?.tourInfo?.destination || "",
          depature: formData?.tourInfo?.depature || "",
          include: formData?.tourInfo?.include || [""],
          notInclude: formData?.tourInfo?.notInclude || [""],
          travelDays: formData?.tourInfo?.travelDays || "",
          travelCountry: formData?.tourInfo?.travelCountry || "",
          travelCity: formData?.tourInfo?.travelCity || "",
          travelNight: formData?.tourInfo?.travelNight || "",
          coverImage: formData?.tourInfo?.coverImage || "",
        },
        tourPlan: tourPlan?.map(({ listText, ...rest }) => ({
          ...rest,
        })),
        location: {
          note: formData?.location?.note || "",
          address: formData?.location?.address || "",
          locationLink: formData?.location?.locationLink || "",
        },
        gallery: {
          image: galleryImages.img,
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
      console.log("error ====>", e);
      setLoading(false);
      toast.error("Error while saving tour");
    }
  };

  useEffect(() => {
    if (data._id) {
      setFormData(data);
      setTourPlan(data.tourPlan);
      setEditFormId(data?._id);
    }
  }, [data]);
  console.log('formData =====>',formData)

  const tourTypeOption = [
    {
      id: 1,
      value: "India",
      children: [
        { id: 101, value: "Char Dham Yatra" },
        { id: 102, value: "Honeymoon Tour" },
        { id: 103, value: "Adventure Tour" },
        { id: 104, value: "Pilgrimage Tour" },
        { id: 105, value: "Wildlife Safari" },
        { id: 106, value: "Beach Retreats" },
        { id: 107, value: "Heritage & Historical Tour" },
        { id: 108, value: "Hill Station Getaway" },
        { id: 109, value: "Desert Safari Rajasthan" },
        { id: 110, value: "Luxury Train Experience" },
        { id: 111, value: "Yoga & Wellness Retreat" },
        { id: 112, value: "Backwater Cruise - Kerala" },
        { id: 113, value: "Cultural Exploration" },
        { id: 114, value: "North East India Discovery" },
        { id: 115, value: "South India Temple Trail" },
      ],
    },
    {
      id: 2,
      value: "International",
      children: [
        { id: 201, value: "European Highlights Tour" },
        { id: 202, value: "USA West Coast Tour" },
        { id: 203, value: "Southeast Asia Discovery" },
        { id: 204, value: "Australia & New Zealand Adventure" },
        { id: 205, value: "Middle East Luxury Tour" },
        { id: 206, value: "African Safari Expedition" },
        { id: 207, value: "Maldives Honeymoon" },
        { id: 208, value: "Bali Wellness & Spa Retreat" },
        { id: 209, value: "Japan Cultural Tour" },
        { id: 210, value: "South Korea K-Culture Tour" },
        { id: 211, value: "Dubai Desert & City Combo" },
        { id: 212, value: "Canada Rockies Tour" },
        { id: 213, value: "Northern Lights Experience - Iceland" },
        { id: 214, value: "Cruise Holiday - Mediterranean" },
      ],
    },
  ];

  const tourCategoryOption = [
    { id: 1, value: "Trending Tour" },
    { id: 2, value: "New Launches" },
    { id: 3, value: "Specials Tour" },
    { id: 4, value: "Upcomming Tour" },
  ];

  return (
    <DestinationStyle>
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

                <div>
                  <label>Tour Category</label>
                  <select
                    value={formData.tourCategoryId}
                    onChange={(e) => {
                      const selectedOption =
                        e.target.options[e.target.selectedIndex];
                      setFormData({
                        ...formData,
                        tourCategoryId: e.target.value,
                        tourCategory: selectedOption.text,
                      });
                    }}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {tourCategoryOption.map((i) => (
                      <option value={i.id}>{i.value}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Travel Country</label>
                  <select
                    value={formData.tourCountryId}
                    onChange={(e) => {
                      const selectedOption =
                        e.target.options[e.target.selectedIndex];
                      setFormData({
                        ...formData,
                        tourCountryId: e.target.value,
                        tourCountry: selectedOption.text,
                      });
                    }}
                  >
                    <option value="">
                      Select
                    </option>
                    {tourTypeOption.map((i) => (
                      <option value={i.id}>{i.value}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Tour Type</label>
                  <select
                    value={formData.tourTypeId}
                    onChange={(e) => {
                      const selectedOption =
                        e.target.options[e.target.selectedIndex];
                      setFormData({
                        ...formData,
                        tourTypeId: e.target.value,
                        tourType: selectedOption.text,
                      });
                    }}
                  >
                    <option value="">
                      Select
                    </option>
                    {tourTypeOption
                      .filter((item) => item.id == formData.tourCountryId)[0]
                      ?.children.map((i) => (
                        <option value={i.id}>{i.value}</option>
                      ))}
                  </select>
                </div>

                <div className="col-span-2 form_title">
                  <h3>Tour Information Section</h3>
                </div>

                <div className="cover_image">
                  <label>Cover Image of Tour</label>

                  {formData?.tourInfo?.coverImage ? (
                    <div className="preview_image">
                      <button
                        className="image_delete_button"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            tourInfo: {
                              ...formData.tourInfo,
                              coverImage: "",
                            },
                          });
                        }}
                      >
                        <RiDeleteBinFill />
                      </button>
                      <img
                        src={formData?.tourInfo?.coverImage}
                        alt="Cover Preview"
                      />
                    </div>
                  ) : (
                    <div className="image_box">
                      <input
                        type="file"
                        onChange={(e) =>
                          handleUploadImage(e.target.files?.[0], "coverImage")
                        }
                      />
                      <span>Select Cover Image For Your Tour</span>
                    </div>
                  )}
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
                    rows="18"
                  />
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
                                  notInclude:
                                    formData.tourInfo.notInclude.filter(
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

                <h3 className="form_title"> Full Tour Plan</h3>
                <button
                  className=" add_more_button secandary_button"
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
                        <RiDeleteBinFill />
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

                      <div className="cover_image">
                        <label>Image of Location</label>

                        {item?.locationImage ? (
                          <div className="preview_image">
                            <button
                              className="image_delete_button"
                              onClick={() => {
                                setTourPlan((prev) =>
                                  prev.map((i) =>
                                    i._id == item._id
                                      ? { ...i, locationImage: "" }
                                      : { ...i }
                                  )
                                );
                              }}
                            >
                              <RiDeleteBinFill />
                            </button>
                            <img
                              src={item?.locationImage}
                              alt="Cover Preview"
                            />
                          </div>
                        ) : (
                          <div className="image_box">
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
                            <span>Select Cover Image For Your Tour</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label>Description</label>
                        <textarea
                          value={item?.description}
                          onChange={(e) =>
                            handleFormChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          rows="18"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <h3 className="col-span-2 form_title">Location Section</h3>
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
                <div className="col-span-2">
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
                    rows={8}
                  />
                </div>
                <h3 className="col-span-2 form_title">Photos Section</h3>
                <div className="col-span-2 multiple_image_section">
                  {galleryImages?.img.map((i) => (
                    <div className="image_box">
                      <img src={i} />
                      <button
                        className="image_delete_button"
                        onClick={() => {
                          setGalleryImages((gal) => ({
                            ...gal,
                            img: gal.img.filter((im) => im !== i),
                          }));
                        }}
                      >
                        <RiDeleteBinFill />
                      </button>
                    </div>
                  ))}
                  <div className="cover_image">
                    <div className="image_box">
                      <input
                        type="file"
                        onChange={(e) =>
                          handleUploadImage(e.target.files?.[0], "galleryImage")
                        }
                      />
                      <span>Select Cover Image For Your Tour</span>
                    </div>
                  </div>
                </div>
              </div>

              <button onClick={SubmitTour} className="primary_button">
                Save changes
              </button>
            </div>
          </div>
        </section>
      </div>
    </DestinationStyle>
  );
}
