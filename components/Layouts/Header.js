import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import Loader from "../Loader";
import { useRouter } from "next/router";
import Image from "next/image";
import api from "@/utils";

export default function Header() {
  const [menuBox, setMenuBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileBox, setProfileBox] = useState(false);
  const [headline, setHeadline] = useState("");

  const router = useRouter();

  const getHeadlineApi = async () => {
    try {
      const response = await api.get("/api/webdata/get_headline");
      console.log("response2345678 ======>", response);
      if (response.status == 200) {
        // setStoreData(response.data.data[0]);
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
    <div className="header_section">
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
              src="/assets/logo.png"
              alt={"Logo"}
              width={100}
              height={50}
              className="logo_img"
            />
          </Link>
          <div className="navigation">
            <Link className="" href="/destination">
              Destination
            </Link>
            <Link className="" href="/">
              About
            </Link>
            <Link className="" href="/destination">
              Ways To Go
            </Link>
            <Link className="" href="/">
              Deals
            </Link>
            <Link className="" href="/">
              Gallery
            </Link>
          </div>
          <button className="primary_button">Get in Touch</button>
        </nav>
      </header>
    </div>
  );
}
