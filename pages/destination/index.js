import { CiCalendarDate, CiFilter } from "react-icons/ci";
import { useEffect, useState } from "react";
import { baseUrl } from "@/utils";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";

import { useSession } from "next-auth/react";
import Loader from "@/components/Loader";
import CreateEditSpark from "@/components/Form/CreateEditSpark";
import { useRouter } from "next/router";
import Image from "next/image";
import { IoLocationOutline } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";

export default function AllSparks() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [activeScreen, setActiveScreen] = useState("my_spark");
  const [editFormData, setEditFormData] = useState({});

  return (
    <main className="destination_section">
      <div className="banner_image">
        <Image
          src="/assets/mountain_boy.jpg"
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "100%",
            height: "800px",
            objectFit: "cover",
            objectPosition: "top",
          }}
        />
      </div>

      <Loader loading={loading} />
      <section className="container">
        <div>
          <div class="description">
            <h1>
              India Tourism – A Tapestry of Culture, Nature, and Spirituality
            </h1>
            <p>
              India is not just a country; it is a sensory experience that
              unfolds in layers of color, sound, and stories. From the moment
              one steps onto its soil, India greets every traveler with a fusion
              of ancient traditions and vibrant modern life. Tourism in India is
              like turning the pages of a living history book—one that tells
              tales of empires and sages, of sacred rivers and Himalayan peaks,
              of crowded bazaars and tranquil temples.
            </p>
            <p>
              As one travels through India, each state feels like a different
              world. The diversity is extraordinary. In the north, the mighty
              Himalayas cast long shadows over snow-fed rivers and pine-covered
              valleys. Here, adventure and serenity blend seamlessly. Places
              like <strong>Leh-Ladakh</strong>, <strong>Shimla</strong>, and{" "}
              <strong>Manali</strong> are popular for trekking, biking, skiing,
              and simply breathing in the cool, crisp mountain air. Meanwhile,
              in the lush foothills of <strong>Uttarakhand</strong> and{" "}
              <strong>Himachal Pradesh</strong>, sacred towns like{" "}
              <strong>Rishikesh</strong> and <strong>Haridwar</strong> offer
              spiritual retreats along the banks of the Ganges.
            </p>
            <p>
              Move towards the west and the arid beauty of{" "}
              <strong>Rajasthan</strong> takes over. Golden sands stretch
              beneath the scorching sun while palaces and forts rise like jewels
              from the desert. The city of <strong>Jaipur</strong> stuns with
              its pink hues, intricate architecture, and royal heritage, while{" "}
              <strong>Udaipur</strong>, with its lakes and palaces, feels like a
              dream painted in blue and silver. In <strong>Jaisalmer</strong>,
              one can sleep under the stars in desert camps, surrounded by music
              and traditional Rajasthani dance.
            </p>
            <p>
              In the heart of India lies <strong>Madhya Pradesh</strong>, a
              region blessed with both wildlife and history. From the temples of{" "}
              <strong>Khajuraho</strong>, known for their intricate carvings, to
              the tiger reserves of <strong>Kanha</strong> and{" "}
              <strong>Bandhavgarh</strong>, nature and culture coexist with
              grace. Similarly, in <strong>Gujarat</strong>, tourists can marvel
              at the White Rann of Kutch, a salt desert that glows under the
              full moon, or visit the towering <strong>Statue of Unity</strong>,
              the tallest statue in the world.
            </p>
            <p>
              The southern part of India is a world of its own—lush, green, and
              deeply spiritual. In <strong>Kerala</strong>, backwaters wind
              lazily through coconut groves, and houseboats drift gently on
              their surface. Ayurveda, an ancient healing system, thrives here
              in tranquil wellness retreats. <strong>Tamil Nadu</strong>{" "}
              impresses with its towering Dravidian temples in{" "}
              <strong>Madurai</strong> and <strong>Thanjavur</strong>, each
              carved in devotion and artistry. <strong>Karnataka</strong> offers
              a mix of history and tech, from the ruins of{" "}
              <strong>Hampi</strong> to the gardens and modernity of{" "}
              <strong>Bangalore</strong>. Meanwhile,{" "}
              <strong>Andhra Pradesh</strong> and <strong>Telangana</strong>{" "}
              invite travelers to explore ancient dynasties and bustling cities
              like <strong>Hyderabad</strong>, known for its biryani and
              old-world charm.
            </p>
          
          </div>
        </div>
        <div className="max-w-screen-lg mx-auto min-h-[60vh]">
          {/* Filter Bar  */}
          <h1>Filter Bar</h1>

          {/* All Tour Post */}
          <div className="post_grid">
            {[1, 1, 1, 1, 1, 1]?.map((item, index) => {
              return (
                <div className="post_card" key={index}>
                  <div className="image_wrapper">
                    <Image
                      src={
                        "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      }
                      alt={"title"}
                      width={300}
                      height={300}
                      className="post_image"
                    />
                  </div>
                  <div className="info-row">
                    <span className="icon">
                      <CiCalendarDate /> 8 Days
                    </span>
                    <span className="icon">
                      <IoLocationOutline /> 3 Locations
                    </span>
                  </div>
                  <Link
                    href={`/destination/view/${index}`}
                    className="post_title"
                  >
                    Switzerland
                  </Link>
                  <div className="location_row">
                    <IoLocationOutline />
                    India
                  </div>
                  <h3 className="price">
                    <FaRupeeSign /> 12000
                  </h3>
                  <p className="post_description">
                    Lorem Ipsum has been the industry's standard dummy text ever
                    since the 1500s, when an unknown printer took a galley of
                    type and scrambled it to make a type specimen book.
                  </p>
                  <div className="action_buttons">
                    <button className="secandary_button">Query Form</button>
                    <button className="primary_button">Explore Now</button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="">Pagination bar</div>
        </div>
      </section>

      {activeScreen === "my_spark" ? (
        "abc"
      ) : activeScreen === "add_spark" ? (
        <CreateEditSpark
          data={editFormData}
          handleClose={(res) => {
            if (activeScreen === "add_spark") {
              setPosts([res, ...posts]);
              setActiveScreen("my_spark");
            }
          }}
        />
      ) : (
        ""
      )}
    </main>
  );
}
