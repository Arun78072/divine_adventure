import { baseUrl } from "@/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../Loader";
import { useRouter } from "next/router";
import { IoClose } from "react-icons/io5";

export default function CreateEditAskQuestion({ data, handleClose }) {
  const [activeScreen, setActiveScreen] = useState("add_question");
  const [loading, setLoading] = useState(false);
  const [selectedBounty, setSelectedBounty] = useState({});
  const [searchTag, setSearchTag] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [bountyList, setBountyList] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    bounty: "",
  });
  const [error, setError] = useState({
    title: "",
  });
  const router = useRouter();

  const SubmitForm = async () => {
    let hasError = false;

    if (formData.title.trim().length < 2) {
      setError((prevError) => ({
        ...prevError,
        title: "Question is required",
      }));
      hasError = true;
    }

    if (hasError) {
      return;
    }
    try {
      setLoading(true);
      const data = { ...formData, bounty: selectedBounty._id };
      if (activeScreen === "edit_question") {
        data.id = formData._id;
        delete data.createdAt;
        delete data._id;
        delete data.user;
        delete data.updatedAt;
        delete data.isDelete;
        delete data.__v;
      }
      const response = await axios.post(
        `${baseUrl}/api/ask/${
          activeScreen === "add_question" ? "post_question" : "edit_question"
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
          activeScreen === "edit_question"
            ? "Successfully Updated Ask Question"
            : "Successfully Created Ask Question";
        toast.success(message);
        if (activeScreen === "edit_question") {
          router.push(`/ask`);
        } else {
          handleClose(response.data.question);
        }
      } else {
        toast.error("Something Went Wrong");
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      toast.error("Something Went Wrong");
    }
  };

  const searchBounty = async (value) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/ask/search_bounty`,
        {
          search_query: value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 200) {
        const data = response.data;
        setBountyList(data.data);
      } else {
        toast.error("Something went wrong");
      }
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  const handleBountys = async (i) => {
    setSelectedBounty(i);
    setSearchTag("");
  };

  const handleBlur = (e) => {
    setTimeout(() => {
      setIsInputFocused(false);
    }, 100);
  };

  useEffect(() => {
    if (typeof searchTag == "string") {
      const searchVal = setTimeout(() => {
        searchBounty(searchTag);
      }, 500);
      return () => clearTimeout(searchVal);
    }
  }, [searchTag]);

  useEffect(() => {
    if (data._id) {
      setFormData(data);
      setActiveScreen("edit_question");
    } else {
      setActiveScreen("add_question");
    }
  }, [data]);

  return (
    <div>
      <Loader loading={loading} />
      <section className="w-full mt-32 my-5">
        <div className="max-w-screen-lg mx-auto">
          <h1 className="font-semibold ml-6 text-3xl">Ask Question</h1>
          <div className="flex flex-col md:flex-row gap-6 p-5">
            <div className="flex flex-col w-full" style={{ flex: 1 }}>
              <div className="removed_default_css">
                <label>Description *</label>
                <textarea
                  rows="6"
                  value={formData.title}
                  className="w-full p-2 rounded-lg block my-2 border border-solid border-black"
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Ask Anything  ..."
                ></textarea>

                <p className="text-xs text-red-500">{error.title}</p>
              </div>

              <div className="relative" onBlur={handleBlur}>
                <label>Select Bounty </label>
                <div className="flex items-center gap-1 flex-wrap">
                  {selectedBounty?._id && (
                    <button
                      className="w-full flex justify-between bg-gray-400/50 p-2.5 rounded-md hover:bg-red-400 items-center"
                      onClick={() => setSelectedBounty()}
                    >
                      {selectedBounty.title} <IoClose />
                    </button>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={searchTag}
                    onChange={(e) => setSearchTag(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    className="w-full p-2 rounded-lg block my-2 border border-solid border-black"
                    placeholder="Search Bounty"
                  />

                  {isInputFocused && (
                    <div
                      className="w-full overflow-hidden rounded-lg block my-2 border border-solid border-[#00000040] absolute bg-white top-[36px] z-50"
                      onMouseDown={(e) => {
                        e.preventDefault();
                      }}
                    >
                      {bountyList.length > 0 ? (
                        bountyList?.map((i, ix) => {
                          return (
                            <div
                              className="block hover:bg-blue-900 hover:text-white cursor-pointer  px-2 flex items-center"
                              key={ix}
                            >
                              <input
                                type="checkbox"
                                id={i.title}
                                name={i.title}
                                value={i.title}
                                checked={selectedBounty?._id == i._id}
                                onChange={() => handleBountys(i)}
                              />
                              <label
                                htmlFor={i.title}
                                className="p-2 w-full block"
                              >
                                {i.title}
                              </label>
                            </div>
                          );
                        })
                      ) : (
                        <span className="px-2">No Bounty Found</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <button
                className="mt-4 w-fit py-2 px-4 font-medium text-sm border rounded-[8px] text-white bg-black hover:bg-gray-800 lg:text-medium"
                onClick={SubmitForm}
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
