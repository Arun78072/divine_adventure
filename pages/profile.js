import Loader from "@/components/Loader";
import MyBounty from "@/components/Profile/MyBounty";
import MySpark from "@/components/Profile/MySpark";
import Wallet from "@/components/Profile/Wallet";
import { baseUrl, copyToClipboard } from "@/utils";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Profile() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [activeTab, setActiveTab] = useState("bounties");
  // If user is not Loged in
  const router = useRouter();
  // if (status === "unauthenticated") {
  //   router.push("/");
  // }
  const getUserData = async () => {
    // setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/api/profile/user_detail`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status == 200) {
        setUserData(response.data.data);
      }
    } catch (e) {
      toast.error("Something went wrong");
      //   router.push("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // if (session?.user?.id) {
    //   getUserData();
    // }
  }, [session]);

  return (
    <main className="relative max-w-screen-lg mx-auto mt-8 p-3">
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <>
          <div className="w-full mt-32 my-5 px-3"></div>
          <div>
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name}
                width={100}
                height={100}
                className="w-[100px] rounded-xl"
              />
            ) : (
              <span className="w-[100px] h-[100px] text-3xl  rounded-xl flex items-center justify-center bg-gray-200">
                {session?.user?.name.charAt(0)}
              </span>
            )}

            <h2 className="mt-5"> Name : {session?.user.name}</h2>
            <h2 className="mt-1"> Email : {session?.user.email}</h2>
            <h2 className="mt-1 flex items-center gap-1">
              Referral Code :
              <button
                className="cursor-pointer flex items-center"
                onClick={() => {
                  copyToClipboard(userData.inviteCode);
                }}
              >
                {" "}
                {userData.inviteCode} <FaRegCopy />{" "}
              </button>
            </h2>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={() => {
                setActiveTab("bounties");
              }}
              className={`${
                activeTab == "bounties"
                  ? "bg-black text-white"
                  : "bg-[#E0E0E0] text-black"
              }  max-w-[400px] w-fit my-3 py-2 px-3 rounded-lg`}
            >
              My Bounties
            </button>
            <button
              onClick={() => {
                setActiveTab("sparks");
              }}
              className={`${
                activeTab == "sparks"
                  ? "bg-black text-white"
                  : "bg-[#E0E0E0] text-black"
              }  max-w-[400px] w-fit my-3 py-2 px-3 rounded-lg`}
            >
              My Sparks{" "}
            </button>
            <button
              onClick={() => {
                setActiveTab("wallet");
              }}
              className={`${
                activeTab == "wallet"
                  ? "bg-black text-white"
                  : "bg-[#E0E0E0] text-black"
              }  max-w-[400px] w-fit my-3 py-2 px-3 rounded-lg`}
            >
              Wallet
            </button>
          </div>

          <div>
            {activeTab == "bounties" ? (
              <MyBounty />
            ) : activeTab == "sparks" ? (
              <MySpark />
            ) : activeTab == "wallet" ? (
              <Wallet data={userData} />
            ) : (
              ""
            )}
          </div>
        </>
      )}
    </main>
  );
}
