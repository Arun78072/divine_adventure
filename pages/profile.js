import Loader from "@/components/Loader";
import MyTours from "@/components/Profile/MyTours";
import api from "@/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [storeData, setStoreData] = useState({});
  const [headline, setHeadline] = useState("");

  const router = useRouter();

  const getHeadlineApi = async () => {
    try {
      const response = await api.get("/api/webdata/get_headline");
      console.log("response ======>", response);
      if (response.status == 200) {
        setStoreData(response.data.data[0]);
        setHeadline(response.data.data[0].title);
      }
    } catch (e) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const updateHadline = async () => {
    if (headline.length < 3) {
      toast.error("Invalid Headling");
      return;
    }
    try {
      const response = await api.post("/api/webdata/update_headline", {
        id: storeData._id,
        title: headline,
      });
      if (response.status == 200) {
        window.location.reload();
      }
    } catch (e) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const data = JSON.parse(localStorage.getItem("user"));
      setUserData(data);
      getHeadlineApi();
    } else {
      router.push("/");
    }
  }, []);

  // console.log("storeData======>", storeData);
  return (
    <main className="container">
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <>
          <div className="top-spacer"></div>
          <div className="profile-info">
            <span className="avatar-circle">{userData?.name?.charAt(0)}</span>
            <h2 className="user-name">Name : {userData?.name}</h2>
            <h2 className="user-email">Email : {userData?.email}</h2>
          </div>

          {/* Headline Setion */}
          <div className="headline_form">
            <label>Change Headline </label>
            <input
              type="text"
              value={headline}
              onChange={(e) => {
                setHeadline(e.target.value);
              }}
            />
            <button
              onClick={() => updateHadline()}
              className="secandary_button"
            >
              Update Headline
            </button>
          </div>

          {/* All Tour Section */}
          {/* <MyTours /> */}
        </>
      )}
    </main>
  );
}
