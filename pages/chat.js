import { BsMic } from "react-icons/bs";
import { RiImageLine } from "react-icons/ri";
import { FiSmile } from "react-icons/fi";
import { LuSendHorizonal } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { baseUrl } from "@/utils";
import { useSession } from "next-auth/react";

import { FaAngleDown } from "react-icons/fa";

import { FaArrowDown } from "react-icons/fa";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/router";

export default function Chat() {
  const { data: session, status } = useSession();
  const router = useRouter();
  // If user is not Loged in
  if (status === "unauthenticated") {
    router.push("/");
  }
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const [loader, setLoader] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [messageData, setMessageData] = useState([]);
  const [streamData, setStreamData] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [tagList, setTagList] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchTag, setSearchTag] = useState("");
  const [disableQueryInput, setDisableQueryInput] = useState(false);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;
      const scrollTo =
        messagesEndRef.current.offsetTop - scrollContainer.offsetTop - 200;
      scrollContainer.scrollTo({ top: scrollTo, behavior: "smooth" });
    }
  };

  const searchCode = async (query) => {
    if (query.length < 3) {
      setLoader(true);
      setTimeout(() => {
        setMessageData([
          ...messageData,
          {
            id: messageData.length + 1,
            message:
              " It seems like your message might have been cut off. Could you please provide more details or clarify what you need assistance with? I'm here to help!",
            isUser: false,
          },
        ]);
        setLoader(false);
      }, 10);

      return;
    }

    setMessageData([
      ...messageData,
      {
        id: messageData.length + 1,
        message: query,
        isUser: true,
      },
    ]);
    setSearchString("");
    setLoader(true);
    setDisableQueryInput(true);
    try {
      setLoader(true);
      const response = await axios.post(
        `https://neo.sdnaprod.com/spark-backend/search/semantic_search`,
        {
          query: query,
          user_id: session.user.id,
          access_codes: selectedTags.map((tag) => tag.code) || [],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (
        response?.data[0]?.error &&
        response?.data[0]?.error.includes("404 Client Error")
      ) {
        setMessageData([
          ...messageData,
          {
            id: messageData.length + 1,
            message: query,
            isUser: true,
          },
          {
            id: messageData.length + 2,
            message: "Salad is not running",
            isUser: false,
          },
        ]);
        setLoader(false);
      } else if (response.status == 200) {
        const messageResponse = response.data;


        await Promise.all(
          messageResponse.map(
            (item, index) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  // Replace ** with <b> tags and newline characters with <br/>
                  const formattedResponse = item.response
                    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
                    .replace(/\n/g, "<br/>");

                  setStreamData((prevResponses) => [
                    ...prevResponses,
                    formattedResponse,
                  ]);

                  resolve();
                }, index * 100); // Adjust the timeout as needed
              })
          )
        );

        setMessageData([
          ...messageData,
          {
            id: messageData.length + 1,
            message: query,
            isUser: true,
          },
          {
            id: messageData.length + 2,
            message: messageResponse
              .map((item) => {
                let modifiedResponse = item.response.replace(
                  /\*\*(.*?)\*\*/g,
                  "<b>$1</b>"
                );
                modifiedResponse = modifiedResponse.replace(/\n/g, "<br/>");
                return modifiedResponse;
              })
              .join(""),
            isUser: false,
          },
        ]);

        setLoader(false);
        setStreamData([]);
      }

      setDisableQueryInput(false);
    } catch (e) {
      setMessageData([
        ...messageData,
        {
          id: messageData.length + 1,
          message: query,
          isUser: true,
        },
        {
          id: messageData.length + 2,
          message:
            "Apologies, but there seems to be an issue with the search. Please try again.",
          isUser: false,
        },
      ]);
      setDisableQueryInput(false);
      setLoader(false);
      console.log("error ====>", e);
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
    scrollToBottom();
  }, [messageData]);

  return (
    <main className="relative">
      <section className="w-full mt-32 my-5 px-3">
        <div className="max-w-screen-lg mx-auto min-h-[60vh] flex flex-col max-h-[80vh]">
          <h1 className="font-semibold ml-6 text-3xl">Chat</h1>
          <div
            className="p-3 flex-1 overflow-y-scroll style_scroll"
            ref={scrollContainerRef}
          >
            {messageData?.map((i, ix) => {
              return (
                <div
                  key={ix}
                  className={
                    i.isUser
                      ? "bg-black text-white max-w-[400px] w-fit ml-auto my-3 p-3 rounded-custom1"
                      : "bg-[#E0E0E0] text-[#000] max-w-[70%] w-fit my-3 p-3 rounded-custom"
                  }
                >
                  <div dangerouslySetInnerHTML={{ __html: i.message }} />
                </div>
              );
            })}
            {loader && (
              <div
                className={
                  "bg-[#E0E0E0] text-[#000] max-w-[70%] w-fit my-3 p-3 rounded-custom flex items-center flex-wrap"
                }
              >
                <div className="">
                  <div
                    dangerouslySetInnerHTML={{ __html: streamData.join("") }}
                  />
                  <div className="chat_loader ml-2"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex items-center gap-1 mb-1 flex-wrap">
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

          <div className="border flex items-center gap-2 rounded-lg">
            <div className="relative" onBlur={handleBlur}>
              <div className="relative">
                <div>
                  <input
                    type="text"
                    value={searchTag}
                    onChange={(e) => setSearchTag(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    className="w-full p-2 rounded-lg block bg-[#eee] focus:outline-none"
                    placeholder="Search Tag"
                  />
                  <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-[#3f3f3f]">
                    <FaAngleDown />
                  </span>
                </div>

                {isInputFocused && (
                  <div
                    className="w-full overflow-hidden rounded-lg block my-2 border border-solid border-[#00000040] absolute bg-white top-[36px]"
                    onMouseDown={(e) => {
                      e.preventDefault();
                    }}
                  >
                    {tagList?.map((i, ix) => {
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
                          <label htmlFor={i.code} className="p-2 w-full block">
                            {i.name}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between flex-auto">
              <input
                type="text"
                disabled={disableQueryInput}
                className="p-2 grow rounded-xl"
                placeholder="Enter your message"
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    searchCode(searchString);
                  }
                }}
              />

              <button
                className="text-xl text-[#828282] w-[26px]"
                onClick={() => {
                  searchCode(searchString);
                }}
              >
                <LuSendHorizonal />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
