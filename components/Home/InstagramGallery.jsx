import React, { useEffect, useState } from "react";
import api from "@/utils";
import { toast } from "react-toastify";
import axios from "axios";
import { InstaGallery } from "@/styles/home.style";

export default function InstagramGallery() {
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState([
    {
      id: "1",
      media_url:
        "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
      permalink: "#",
      caption: "Dummy Image 1",
    },
    {
      id: "2",
      media_url:
        "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
      permalink: "#",
      caption: "Dummy Image 2",
    },
    {
      id: "3",
      media_url:
        "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
      permalink: "#",
      caption: "Dummy Image 3",
    },
  ]);

  const getInstaDetailsApi = async () => {
    setLoading(true);

    const token = process.env.INSTAGRAM_ACCESS_TOKEN;
    const url = `https://graph.instagram.com/me/media?fields=id,media_url,permalink,caption,media_type,thumbnail_url,timestamp&access_token=${token}`;

    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        setPostData(response.data.data || []);
      }
    } catch (e) {
      console.error("Instagram fetch error:", e);
      toast.error("Failed to load Instagram posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // getInstaDetailsApi();
  }, []);

  if (loading) return <p>Loading Instagram posts...</p>;

  return (
    <InstaGallery>
      <div className="container">
        <h2 className="insta_title">Insta Gallery</h2>
        <div className="insta_post">
          {postData.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={post.media_url}
                alt={post.caption?.slice(0, 50)}
                className="insta_img"
              />
            </a>
          ))}
        </div>
      </div>
    </InstaGallery>
  );
}
