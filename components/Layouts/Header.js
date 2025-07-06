import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import api, { tourTypeOption } from "@/utils";
import { HederStyle } from "@/styles/layout.style";
import { FaAngleDown } from "react-icons/fa";

export default function Header() {
  const [loading, setLoading] = useState(false);
  const [profileBox, setProfileBox] = useState(false);
  const [headline, setHeadline] = useState("");

  const getHeadlineApi = async () => {
    try {
      const response = await api.get("/api/webdata/get_headline");
      if (response.status == 200) {
        setHeadline(response.data.data[0].title);
      }
    } catch (e) {
      // toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHeadlineApi();
  }, []);

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
          <div className="navigation">
            <Link className="" href="/">
              Home
            </Link>
            <div className="mega_menu">
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
            <div className="mega_menu">
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
          {/* <button className="primary_button">Get in Touch</button> */}
        </nav>
      </header>
    </HederStyle>
  );
}
