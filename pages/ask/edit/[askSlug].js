import CreateEditAskQuestion from "@/components/Form/CreateEditAskQuestion";
import Loader from "@/components/Loader";
import { baseUrl } from "@/utils";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function EditBounty() {
  const [bountyData, setBountyData] = useState({});
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  const router = useRouter();
  const { askSlug } = router.query;

  const getBountyDetailsApi = async (url) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${baseUrl}/api/bounty/bounty?bountyId=${url}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 200) {
        const data = response.data;
        setBountyData({ ...data.data.bounty, user: data.data.user });
      } else {
        toast.error("Something went wrong");
      }
    } catch (e) {
      if (e?.response?.data?.error == "User not authenticated") {
        toast.error("User not authenticated");
      } else {
        toast.error("Something went wrong");
      }
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (askSlug) {
      getBountyDetailsApi(askSlug);
    }
  }, [askSlug]);

  console.log("askSlug=============>", askSlug);

  return (
    <div>
      {/* Loader === */}
      <Loader loading={loading} />

      {!loading && <CreateEditAskQuestion data={bountyData} />}
    </div>
  );
}
