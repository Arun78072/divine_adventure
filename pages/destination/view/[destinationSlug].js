import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "@/utils";
import Image from "next/image";
import { LuIndianRupee } from "react-icons/lu";
import Loader from "@/components/Loader";
import { DestinationStyle } from "@/styles/destination.style";
import TourBookForm from "./TourBookForm";
import { SkeletonLoaderStyle } from "@/styles/skeletonLoader";

export default function ViewPost() {
  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { destinationSlug } = router.query;

  const getTourDetailsApi = async (url) => {
    setLoading(true);
    try {
      const response = await api.get(`/api/tour/tour_get_by_id?tourId=${url}`);
      if (response.status == 200) {
        const data = response.data.data;
        setPostData(data);
      }
    } catch (e) {
      if (e?.response?.data?.error == "User not authenticated") {
        toast.error("User not authenticated");
      } else {
        toast.error("Something went wrong");
      }
      // router.push("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (destinationSlug) {
      getTourDetailsApi(destinationSlug);
    }
  }, [destinationSlug]);

  return (
    <>
      <DestinationStyle>
        {loading ? (
          <SkeletonLoaderStyle>
            <div className="destination_page">
              <div className="banner_img"></div>
              <div className="container view_section">
              <div className="left_section">
              </div>

              <div className="right_section">
              </div>
            </div>
            </div>
          </SkeletonLoaderStyle>
        ) : (
          <>
            <Image
              src={postData?.tourInfo?.coverImage}
              width={0}
              height={0}
              sizes="100vw"
              alt="Banner"
              className="banner_img"
            />

            <div className="container view_section">
              <div className="left_section">
                <h1 className="tour_title">{postData?.tourInfo?.title}</h1>
                <p className="price">
                  <LuIndianRupee />
                  <span>{postData?.tourInfo?.price}</span>{" "}
                  <span>/ Per Couple</span>
                </p>
                <Image
                  src={postData?.tourInfo?.coverImage}
                  width={0}
                  height={0}
                  sizes="100vw"
                  alt="Banner"
                  className="tour_image"
                />
                <p className="description">{postData?.tourInfo?.description}</p>

                {/* Tour Plan  */}

                <div className="tour_plan">
                  <h2 className="title">Tour plan</h2>

                  {postData?.tourPlan?.map((item, index) => (
                    <div className="day_section">
                      <span>{index + 1}</span>
                      <h3>
                        Day {index + 1}: {item?.title}
                      </h3>

                      <div className="tour_content">
                        <div>
                          <p>{item?.description}</p>
                          <ul>
                            {item?.list?.map((i, ix) => (
                              <li>{i}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          {item?.locationImage ? (
                            <Image
                              src={item?.locationImage}
                              alt={item.title}
                              width={40}
                              height={40}
                              sizes="100vw"
                              style={{
                                width: "100%",
                                height: "250px",
                                objectFit: "cover",
                                borderRadius: "10px",
                              }}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Gallery Section */}
                <div className="gallery_section">
                  <h2>Explore the Journey in Pictures</h2>
                  <p>
                    Discover the unforgettable highlights of this tour through
                    our curated photo gallery. From scenic landscapes and
                    vibrant local experiences to cultural landmarks and
                    fun-filled activities, each snapshot captures the essence of
                    your journey. Let the pictures tell the story before you
                    even begin your adventure.
                  </p>

                  <div className="gallery_grid">
                    {postData?.gallery?.image?.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Gallery Image ${index + 1}`}
                      />
                    ))}

                    {/* <img src="/assets/info1.png" alt="Scenery 1" />
                <img src="/assets/info2.png" alt="Scenery 2" />
                <img src="/assets/info3.png" alt="Scenery 3" />
                <img src="/assets/info4.png" alt="Scenery 4" />
                <img src="/assets/info5.png" alt="Scenery 5" />
                <img src="/assets/info6.png" alt="Scenery 6" /> */}
                  </div>
                </div>
              </div>

              <div className="right_section">
                <h3>Tour Information</h3>
                <div className="info">
                  <p> Destination </p>
                  <p>{postData?.tourInfo?.destination.join(", ")}</p>
                </div>

                <div className="info">
                  <p>Departure </p>
                  <p>{postData?.tourInfo?.depature} </p>
                </div>
                <div className="info">
                  <p>Travel Days </p> <p> {postData?.tourInfo?.travelDays}</p>
                </div>
                <div className="info">
                  <p>Travel Country </p>
                  <p>{postData?.tourInfo?.travelCountry}</p>
                </div>
                <div className="info">
                  <p>Travel City </p>
                  <p>{postData?.tourInfo?.travelCity}</p>
                </div>
                <div className="info">
                  <p>Travel Night </p>
                  <p>{postData?.tourInfo?.travelNight}</p>
                </div>
                <div className="info">
                  <p>Included</p>
                  <p>{postData?.tourInfo?.include?.join(", ")}</p>
                </div>
                <div className="info">
                  <p>Not Included</p>
                  <p>{postData?.tourInfo?.notInclude?.join(", ")}</p>
                </div>

                <div className="location_section">
                  <h3>Tour Location</h3>
                  <h4>Location Address : {postData?.location?.address}</h4>
                  <p>{postData?.location?.note}</p>
                  {postData?.location?.locationLink && (
                    <iframe
                      src={postData.location.locationLink}
                      width="100%" // optional if also using style.width
                      height="450"
                      style={{
                        width: "100%",
                        border: 0,
                        borderRadius: "10px",
                        margin: "30px 0px",
                      }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Google Map"
                    ></iframe>
                  )}
                </div>

                <div className="booking_form">
                  <TourBookForm />
                </div>
              </div>
            </div>
          </>
        )}
      </DestinationStyle>
    </>
  );
}
