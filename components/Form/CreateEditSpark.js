import { baseUrl } from "@/utils";
import axios from "axios";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import Loader from "../Loader";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

/* Using dynamic import of Jodit component as it can't render in server side*/
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function CreateEditSpark({ data, handleClose }) {
  const { status } = useSession();
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [searchTag, setSearchTag] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [activeScreen, setActiveScreen] = useState("add_spark");
  const [tagList, setTagList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editFormId, setEditFormId] = useState();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
  });
  const [error, setError] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
  });
  const router = useRouter();
  const editor = useRef(null);
  const [content, setContent] = useState("");

  // If user is not Loged in
  if (status === "unauthenticated") {
    toast.warn("You are not authorized");
    router.push("/");
  }

  const config = useMemo(
    () => ({
      uploader: {
        insertImageAsBase64URI: true,
        imagesExtensions: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
      },
      buttons: [
        "source",
        "|",
        "bold",
        "strikethrough",
        "underline",
        "italic",
        "|",
        "ul",
        "ol",
        "|",
        "outdent",
        "indent",
        "|",
        "font",
        "fontsize",
        "brush",
        "paragraph",
        "|",
        "image",
        // "video",
        // "table",
        "link",
        "|",
        "align",
        "undo",
        "redo",
        "|",
        "hr",
        "eraser",
        "copyformat",
        "|",
        // "symbol",
        "fullsize",
        // "print",
        // "about",
      ],
    }),
    []
  );

  const handleChange = (value) => {
    setContent(value);
  };

  const SubmitBlog = async () => {
    let hasError = false;

    if (formData.title.trim().length < 2) {
      setError((prevError) => ({
        ...prevError,
        title: "Spark Title is required",
      }));
      hasError = true;
    }

    if (formData.image.trim().length < 2) {
      setError((prevError) => ({
        ...prevError,
        image: "Image Url is required",
      }));
      hasError = true;
    }

    if (content.trim().length < 2) {
      setError((prevError) => ({
        ...prevError,
        description: "Body is required",
      }));
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      setLoading(true);
      const data = {
        title: formData.title,
        description: content,
        category: formData.category,
        image: formData.image,
        tags: selectedTags,
      };
      if (activeScreen === "edit_spark") {
        data.id = editFormId;
      }
      const response = await axios.post(
        `${baseUrl}/api/post/${
          activeScreen === "add_spark" ? "post_spark" : "edit_spark"
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
          activeScreen === "edit_spark"
            ? "Successfully Updated Spark"
            : "Successfully Created Spark";
        toast.success(message);
        if (activeScreen === "edit_spark") {
          router.push(`/all-sparks`);
        } else {
          handleClose(response.data.topic);
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

  const searchTags = async (value) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/post/search_tags`,
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
        setTagList(data.data);
      } else {
        toast.error("Something went wrong");
      }
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  const addTags = async (name) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/post/add_tags`,
        { name },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 200) {
        const data = response.data;
        handleTags(data.data[0]);
      } else {
        toast.error("Something went wrong");
      }
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  const handleTags = async (i) => {
    if (selectedTags.some((item) => item.code === i.code)) {
      setSelectedTags(selectedTags.filter((item) => item.code !== i.code));
    } else {
      setSelectedTags([...selectedTags, { code: i.code, name: i.name }]);
    }
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
        searchTags(searchTag);
      }, 500);
      return () => clearTimeout(searchVal);
    }
  }, [searchTag]);

  useEffect(() => {
    if (data._id) {
      setFormData(data);
      setContent(data.description);
      setSelectedTags(data.tags);
      setEditFormId(data._id);
      setActiveScreen("edit_spark");
    } else {
      setActiveScreen("add_spark");
    }
  }, [data]);

  return (
    <div>
      <Loader loading={loading} />
      <section className="w-full mt-32 my-5">
        <div className="max-w-screen-lg mx-auto">
          <h1 className="font-semibold ml-6 text-3xl">Create / Edit Spark</h1>
          <div className="flex flex-col md:flex-row gap-6 p-5">
            <div className="flex flex-col w-full" style={{ flex: 1 }}>
              <div className="relative" onBlur={handleBlur}>
                <label className="block">Select Tags</label>
                <div className="flex items-center gap-1 flex-wrap">
                  {selectedTags.map((item, ix) => {
                    return (
                      <button
                        key={ix}
                        className="flex items-center bg-blue-300 hover:bg-red-400 rounded-md p-1"
                        onClick={() => handleTags(item)}
                      >
                        {item.name} <IoClose />
                      </button>
                    );
                  })}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={searchTag}
                    onChange={(e) => setSearchTag(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    className="w-full p-2 rounded-lg block my-2 border border-solid border-black"
                    placeholder="Search Tag"
                  />

                  {isInputFocused && (
                    <div
                      className="w-full overflow-hidden rounded-lg block my-2 border border-solid border-[#00000040] absolute bg-white top-[36px] z-50"
                      onMouseDown={(e) => {
                        e.preventDefault();
                      }}
                    >
                      {tagList.length > 0 ? (
                        tagList?.map((i, ix) => {
                          return (
                            <div
                              className="block hover:bg-blue-900 hover:text-white cursor-pointer  px-2 flex items-center"
                              key={ix}
                            >
                              <input
                                type="checkbox"
                                id={i.code}
                                name={i.code}
                                value={i.code}
                                checked={selectedTags.some(
                                  (item) => item.code === i.code
                                )}
                                onChange={() => handleTags(i)}
                              />
                              <label
                                htmlFor={i.code}
                                className="p-2 w-full block"
                              >
                                {i.name}
                              </label>
                            </div>
                          );
                        })
                      ) : (
                        <div className="block cursor-pointer  px-2 flex items-center">
                          {searchTag}{" "}
                          <button
                            className="ml-2 hover:bg-blue-900 hover:text-white rounded py-1 px-3"
                            onClick={() => addTags(searchTag)}
                          >
                            Add Tag
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label>Spark Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full p-2 rounded-lg block my-2 border border-solid border-black"
                  placeholder="Give your spark a title"
                />
                <p className="text-xs text-red-500">{error.title}</p>
              </div>
              <div>
                <label>Image Link *</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className="w-full p-2 rounded-lg block my-2 border border-solid border-black"
                  placeholder="Paste a link to your spark featured image"
                />
                <p className="text-xs text-red-500">{error.image}</p>
              </div>

              <div className="removed_default_css">
                <label>Body *</label>
                <JoditEditor
                  ref={editor}
                  value={content}
                  config={config}
                  onChange={handleChange}
                  className="w-full h-[70%] mt-2 bg-white"
                />
                <style>{`.jodit-wysiwyg { height: 600px !important; padding: 10px 26px; }`}</style>
                <p className="text-xs text-red-500">{error.description}</p>

                {/* <div className="h-screen w-screen flex items-center flex-col">
                  <div className="my-10 h-full w-[90vw]">
                    Preview:
                    <div dangerouslySetInnerHTML={{ __html: content }}></div>
                  </div>
                </div> */}
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
