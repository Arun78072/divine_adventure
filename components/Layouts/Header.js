import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import api from "@/utils";
import { HederStyle } from "@/styles/layout.style";
import {
  FaAngleDown,
  FaAngleRight,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import tourTypeOption from "@/components/JsonData/TourType.json";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
export default function Header() {
  const [toggel, setToggel] = useState();
  const [headline, setHeadline] = useState("");
  const [showLogout, setShowLogout] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState("");
  const getHeadlineApi = async () => {
    try {
      const response = await api.get("/api/webdata/get_headline");
      if (response.status == 200) {
        setHeadline(response.data.data[0].title);
      }
    } catch (e) {
      // toast.error("Something went wrong");
    }
  };
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setShowLogout(true);
    }
  }, []);

  useEffect(() => {
    getHeadlineApi();
  }, []);

  const LogOutUser = () => {
    localStorage.clear();
    window.location.reload();
    toast.success("Succesfully logout ");
    router.push("/");
  };

  return (
    <HederStyle>
      <div className="title_line_wrapper">
        <div className="title_line">
          {headline ||
            "Up to 15% off September Deals >> | Or save up to 15% on Last Minute Deals >>"}
        </div>
      </div>
      <header className="container">
        <nav className="nav_bar">
          <Link className="" href="/">
            <Image
              src="/site_logo.png"
              alt={"Logo"}
              width={0}
              height={0}
              sizes="100vw"
              className="logo_img"
            />
          </Link>

          <div className={`${toggel ? "mobile_navbar " : ""}navigation`}>
            <Link className="" href="/">
              Home
            </Link>
            <div
              className={`mega_menu ${
                activeMegaMenu === "india" ? "active_mega_menu" : ""
              }`}
              onClick={() => {
                setActiveMegaMenu(
                  activeMegaMenu == "india"
                    ? ""
                    : activeMegaMenu == "international"
                    ? "india"
                    : "india"
                );
              }}
            >
              <Link href="#" onClick={(e) => e.preventDefault()}>
                Indian <FaAngleDown />
              </Link>
              <div className="sub_menu container">
                <div className="megamenu">
                  <div>
                    <h4 className="tour_heading">Indian Tour</h4>
                    <ul>
                      {tourTypeOption[0]?.category[0].tours.map((item) => {
                        const slug = item.value
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/^-+|-+$/g, "");
                        return (
                          <li key={item.id}>
                            <FaAngleRight />
                            <Link
                              href={`/indian-tour/${item.id}-${slug}`}
                              onClick={() => setActiveMegaMenu("")}
                            >
                              {item.value}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div>
                    <h4 className="tour_heading">Honeymoon Tour</h4>
                    <ul>
                      {tourTypeOption[0]?.category[1].tours.map((item) => {
                        const slug = item.value
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/^-+|-+$/g, "");
                        return (
                          <li key={item.id}>
                            <FaAngleRight />
                            <Link
                              href={`/indian-tour/${item.id}-${slug}`}
                              onClick={() => setActiveMegaMenu("")}
                            >
                              {item.value}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div>
                    <h4 className="tour_heading">Indian Special </h4>
                    <ul>
                      {tourTypeOption[0]?.category[2].tours.map((item) => {
                        const slug = item.value
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/^-+|-+$/g, "");
                        return (
                          <li key={item.id}>
                            <FaAngleRight />
                            <Link
                              href={`/indian-tour/${item.id}-${slug}`}
                              onClick={() => setActiveMegaMenu("")}
                            >
                              {item.value}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`mega_menu ${
                activeMegaMenu === "international" ? "active_mega_menu" : ""
              }`}
              onClick={() => {
                setActiveMegaMenu(
                  activeMegaMenu == "international"
                    ? ""
                    : activeMegaMenu == "india"
                    ? "international"
                    : "international"
                );
              }}
            >
              <Link href="#" onClick={(e) => e.preventDefault()}>
                International <FaAngleDown />
              </Link>
              <div className="sub_menu container">
                <div className="megamenu">
                  <div>
                    <h4 className="tour_heading">Indian Tour</h4>
                    <ul>
                      {tourTypeOption[1]?.category[0].tours.map((item) => {
                        const slug = item.value
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/^-+|-+$/g, "");
                        return (
                          <li key={item.id}>
                            <FaAngleRight />
                            <Link
                              href={`/international/${item.id}-${slug}`}
                              onClick={() => setActiveMegaMenu("")}
                            >
                              {item.value}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div>
                    <h4 className="tour_heading">Honeymoon Tour</h4>
                    <ul>
                      {tourTypeOption[1]?.category[1].tours.map((item) => {
                        const slug = item.value
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/^-+|-+$/g, "");
                        return (
                          <li key={item.id}>
                            <FaAngleRight />
                            <Link
                              href={`/international/${item.id}-${slug}`}
                              onClick={() => setActiveMegaMenu("")}
                            >
                              {item.value}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <Link className="" href="/about">
              About
            </Link>
            <Link className="" href="/gallery">
              Gallery
            </Link>
            {showLogout ? (
              <div onClick={LogOutUser} className="logout_btn">
                Logout
              </div>
            ) : (
              ""
            )}
          </div>

          {activeMegaMenu.length > 0 && (
            <span
              onClick={() => setActiveMegaMenu("")}
              className="close_button"
            ></span>
          )}

          <button
            className="hamburger_menu"
            onClick={() => {
              if (!toggel) {
                document.body.style.overflow = "hidden";
              } else {
                document.body.style.overflow = "auto";
              }
              setToggel(!toggel);
            }}
          >
            {!toggel ? <GiHamburgerMenu /> : <IoClose />}
          </button>

          <div className="contact_details">
            <p>
              Customer <br /> Agent
            </p>
          <div>
          <div className="whatsapp">
              <FaWhatsapp />
              <a
                href="https://wa.me/919459575748"
                target="_blank"
                rel="noopener noreferrer"
              >
                9459575748
              </a>
            </div>
            <div>
              <FaPhoneAlt />
              <a href="tel:+919056586553">9056586553</a>
            </div>
          </div>
          </div>
        </nav>
      </header>
    </HederStyle>
  );
}
