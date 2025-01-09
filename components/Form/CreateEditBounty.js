import { baseUrl } from "@/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../Loader";
import { useRouter } from "next/router";

export default function CreateEditBounty({ data, handleClose }) {
  const [activeScreen, setActiveScreen] = useState("add_bounty");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
  });
  const [error, setError] = useState({
    title: "",
    description: "",
    amount: "",
  });
  const router = useRouter();
  const SubmitBlog = async () => {
    let hasError = false;

    if (formData.title.trim().length < 2) {
      setError((prevError) => ({
        ...prevError,
        title: "Bounty Title is required",
      }));
      hasError = true;
    }

    if (!formData.amount || formData.amount.trim() === "") {
      setError((prevError) => ({
        ...prevError,
        amount: "Amount is required",
      }));
      hasError = true;
    }

    if (formData.description.trim().length < 2) {
      setError((prevError) => ({
        ...prevError,
        description: "Description is required",
      }));
      hasError = true;
    }

    if (hasError) {
      return;
    }
    try {
      setLoading(true);
      const data = { ...formData, amount: Number(formData.amount) };
      if (activeScreen === "edit_bounty") {
        data.id = formData._id;
        delete data.createdAt;
        delete data._id;
        delete data.user;
        delete data.updatedAt;
        delete data.isDelete;
        delete data.__v;
      }
      const response = await axios.post(
        `${baseUrl}/api/bounty/${
          activeScreen === "add_bounty" ? "post_bounty" : "edit_bounty"
        }`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        const message =
          activeScreen === "edit_bounty"
            ? "Successfully Updated Bounty"
            : "Successfully Created Bounty";
        toast.success(message);
        if (activeScreen === "edit_bounty") {
          router.push(`/bounties`);
        } else {
          handleClose(response.data.bounty);
        }
      } else {
        toast.error("Something Went Wrong");
      }
      setLoading(false);
    } catch (e) {
      if (e.response.data.error) {
        toast.error(e.response.data.error);
      } else {
        toast.error("Something Went Wrong");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data._id) {
      setFormData(data);
      setActiveScreen("edit_bounty");
    } else {
      setActiveScreen("add_bounty");
    }
  }, [data]);

  return (
    <div>
      <Loader loading={loading} />
      <section className="w-full mt-32 my-5">
        <div className="max-w-screen-lg mx-auto">
          <h1 className="font-semibold ml-6 text-3xl">Create / Edit Bounty</h1>
          <div className="flex flex-col md:flex-row gap-6 p-5">
            <div className="flex flex-col w-full" style={{ flex: 1 }}>
              <div>
                <label>Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full p-2 rounded-lg block my-2 border border-solid border-black"
                  placeholder="Give your bounty a title"
                />
                <p className="text-xs text-red-500">{error.title}</p>
              </div>

              <div>
                <label>Amount *</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  className="w-full p-2 rounded-lg block my-2 border border-solid border-black"
                  placeholder="Specify the bounty award"
                />
                <p className="text-xs text-red-500">{error.amount}</p>
              </div>

              <div className="removed_default_css">
                <label>Description *</label>
                <textarea
                  rows="10"
                  value={formData.description}
                  className="w-full p-2 rounded-lg block my-2 border border-solid border-black"
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="What needs to be done to receive your bounty"
                ></textarea>

                <p className="text-xs text-red-500">{error.description}</p>
              </div>

              <button
                className="mt-4 w-fit py-2 px-4 font-medium text-sm border rounded-[8px] text-white bg-black hover:bg-gray-800 lg:text-medium"
                onClick={SubmitBlog}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
