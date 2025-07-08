import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import api, { tourTypeOption } from "@/utils";
import { HederStyle } from "@/styles/layout.style";
import { FaAngleDown } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
export default function Header() {
  const [toggel, setToggel] = useState();
  const [headline, setHeadline] = useState("");
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

  useEffect(() => {
    getHeadlineApi();
  }, []);
  
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 1050;
      if (!isMobile) {
        setActiveMegaMenu('');
        setToggel(false);
        document.body.style.overflow = 'auto'; 
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
    }
    handleResize();
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);
  
  console.log("toggel =>", toggel);
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
              src="/assets/logo3.png"
              alt={"Logo"}
              width={100}
              height={50}
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
              <div className="sub_menu">
                <ul>
                  {tourTypeOption[0]?.children.map((item) => {
                    const slug = item.value
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/^-+|-+$/g, "");
                    return (
                      <li key={item.id}>
                        <Link href={`/indian-tour/${item.id}-${slug}`}>
                          {item.value}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
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
              <Link className="" href="/destination">
                International <FaAngleDown />
              </Link>
              <div className="sub_menu">
                <ul>
                  {tourTypeOption[1]?.children.map((item) => {
                    const slug = item.value
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/^-+|-+$/g, "");
                    return (
                      <li key={item.id}>
                        <Link href={`/indian-tour/${item.id}-${slug}`}>
                          {item.value}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <Link className="" href="/about">
              About
            </Link>
            <Link className="" href="/destination">
              Ways To Go
            </Link>
            <Link className="" href="/gallery">
              Gallery
            </Link>
          </div>

          <button
            className="hamburger_menu"
            onClick={() => {
              if(!toggel){
                document.body.style.overflow = 'hidden'
              }else{
                document.body.style.overflow = 'auto'
              }
              setToggel(!toggel);
            }}
          >
            {!toggel ? <GiHamburgerMenu /> : <IoClose />}
          </button>
        </nav>
      </header>
    </HederStyle>
  );
}
