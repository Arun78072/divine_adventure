import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import api from "@/utils";
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
              <Link className="" href="/destination">
                Travel Packages <FaAngleDown />
              </Link>
              <div className="sub_menu">
                <div>
                  <h4>Indian Packages</h4>
                  <ul>
                    <li>
                      <Link href="/destination/europe">Europe Tours</Link>
                    </li>
                    <li>
                      <Link href="/destination/asia">Asia Trips</Link>
                    </li>
                    <li>
                      <Link href="/destination/adventure">
                        Adventure Packages
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4>International Packages</h4>
                  <ul>
                    <li>
                      <Link href="/destination/europe">Europe Tours</Link>
                    </li>
                    <li>
                      <Link href="/destination/asia">Asia Trips</Link>
                    </li>
                    <li>
                      <Link href="/destination/adventure">
                        Adventure Packages
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mega_menu">
              <Link className="" href="/destination">
                Travel Packages 2<FaAngleDown />
              </Link>
              <div className="sub_menu">
                <div>
                  <h4>Indian Packages 2</h4>
                  <ul>
                    <li>
                      <Link href="/destination/europe">Europe Tours 2</Link>
                    </li>
                    <li>
                      <Link href="/destination/asia">Asia Trips 2</Link>
                    </li>
                    <li>
                      <Link href="/destination/adventure">
                        Adventure Packages 2
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4>International Packages 2</h4>
                  <ul>
                    <li>
                      <Link href="/destination/europe">Europe Tours 2</Link>
                    </li>
                    <li>
                      <Link href="/destination/asia">Asia Trips 2</Link>
                    </li>
                    <li>
                      <Link href="/destination/adventure">
                        Adventure Packages 2
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <Link className="" href="/about">
              About
            </Link>
            <Link className="" href="/destination">
              Ways To Go
            </Link>
            <Link className="" href="/">
              Gallery
            </Link>
          </div>
          {/* <button className="primary_button">Get in Touch</button> */}
        </nav>
      </header>
    </HederStyle>
  );
}
