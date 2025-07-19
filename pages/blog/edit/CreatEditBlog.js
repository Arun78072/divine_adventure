import React, { useRef, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/Loader";
import { DestinationStyle } from "@/styles/destination.style";
import { RiDeleteBinFill } from "react-icons/ri";
/* Using dynamic import of Jodit component as it can't render in server side*/
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function CreatEditBlog({ data }) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    coverImage: "",
    description: "",
  });

  const editor = useRef(null);
  const [content, setContent] = useState("");

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

  const SubmitTour = async () => {
    console.log("content", content);
  };

  return (
    <DestinationStyle>
      <div className="form_box">
        <Loader loading={loading} />
        <section>
          <div className="container">
            <h1>Create / Edit Blog</h1>
            <div className="form_wrapper">
              <div className="form_grid">
                <div className="col-span-2 form_title">
                  <label>Tour Status</label>
                  <input
                    type="text"
                    value={formData?.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        title: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="cover_image">
                  <label>Cover Image of Blog</label>

                  {formData?.coverImage ? (
                    <div className="preview_image">
                      <button
                        className="image_delete_button"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            coverImage:''
                          });
                        }}
                      >
                        <RiDeleteBinFill />
                      </button>
                      <img
                        src={formData?.coverImage}
                        alt="Cover Preview"
                      />
                    </div>
                  ) : (
                    <div className="image_box">
                      <input
                        type="file"
                        onChange={(e) =>
                          handleUploadImage(e.target.files?.[0], "coverImage")
                        }
                      />
                      <span>Select Cover Image For Your Tour</span>
                    </div>
                  )}
                </div>

                <div className="col-span-2 form_title">
                  <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    onChange={handleChange}
                    className="w-full h-[70%] mt-2 bg-white"
                  />
                </div>
              </div>

              <button onClick={SubmitTour} className="primary_button">
                Save changes
              </button>
            </div>
          </div>
        </section>
      </div>
    </DestinationStyle>
  );
}
