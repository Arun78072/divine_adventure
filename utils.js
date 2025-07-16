import axios from "axios";
import Router from 'next/router'; 

export const baseUrl = "https://divine-adventure.vercel.app/";
// export const baseUrl = "http://localhost:3000";

export const tourTypeOption = [
  {
    id: 1,
    value: "India",
    children: [
      {
        id: 101,
        value: "Char Dham Yatra",
        description:
          "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
        coverImage:
          "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
      },
      {
        id: 102,
        value: "Honeymoon Tour",
        description:
          "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
        coverImage:
          "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
      },
      {
        id: 103,
        value: "Adventure Tour",
        description:
          "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
        coverImage:
          "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
      },
      {
        id: 104,
        value: "Pilgrimage Tour",
        description:
          "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
        coverImage:
          "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
      },
      {
        id: 105,
        value: "Wildlife Safari",
        description:
          "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
        coverImage:
          "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
      },
      {
        id: 106,
        value: "Beach Retreats",
        description:
          "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
        coverImage:
          "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
      },
      {
        id: 107,
        value: "Heritage & Historical Tour",
        description:
          "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
        coverImage:
          "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
      },
      {
        id: 108,
        value: "Hill Station Getaway",
        description:
          "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
        coverImage:
          "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
      },
      {
        id: 109,
        value: "Desert Safari Rajasthan",
        description:
          "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
        coverImage:
          "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
      },
      {
        id: 110,
        value: "Luxury Train Experience",
        description:
          "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
        coverImage:
          "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
      },
      {
        id: 111,
        value: "Yoga & Wellness Retreat",
        description:
          "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
        coverImage:
          "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
      },
      {
        id: 112,
        value: "Backwater Cruise - Kerala",
        description:
          "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
        coverImage:
          "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
      },
      {
        id: 113,
        value: "Cultural Exploration",
        description:
          "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
        coverImage:
          "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
      },
      {
        id: 114,
        value: "North East India Discovery",
        description:
          "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
        coverImage:
          "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
      },
      {
        id: 115,
        value: "South India Temple Trail",
        description:
          "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
        coverImage:
          "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
      },
      {
        id: 116,
        value: "Ladakh Trip",
        description:
          "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
        coverImage:
          "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
      },
      {
        id: 117,
        value: "Mini Char Dham Yatra",
        description:
          "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
        coverImage:
          "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
      },
      {
        id: 120,
        value: "All India Tour",
        description:
          "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
        coverImage:
          "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
      },
      {
        id: 121,
        value: "Lahaul Spiti",
        description:
          "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
        coverImage:
          "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
      },
      {
        id: 122,
        value: "Rajasthan",
        description:
          "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
        coverImage:
          "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
      },
      {
        id: 123,
        value: "Kashmir",
        description:
          "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
        coverImage:
          "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
      },
      {
        id: 124,
        value: "Kerala",
        description:
          "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
        coverImage:
          "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
      },
      {
        id: 125,
        value: "Karnataka ",
        description:
          "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
        coverImage:
          "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
      },
      {
        id: 126,
        value: "Amarnath ",
        description:
          "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
        coverImage:
          "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
      },
    ],
  },
  {
    id: 2,
    value: "International",
    children: [
      { id: 201, value: "European Highlights Tour" },
      { id: 202, value: "USA West Coast Tour" },
      { id: 203, value: "Southeast Asia Discovery" },
      { id: 204, value: "Australia & New Zealand Adventure" },
      { id: 205, value: "Middle East Luxury Tour" },
      { id: 206, value: "African Safari Expedition" },
      { id: 207, value: "Maldives Honeymoon" },
      { id: 208, value: "Bali Wellness & Spa Retreat" },
      { id: 209, value: "Japan Cultural Tour" },
      { id: 210, value: "South Korea K-Culture Tour" },
      { id: 211, value: "Dubai Desert & City Combo" },
      { id: 212, value: "Canada Rockies Tour" },
      { id: 213, value: "Northern Lights Experience - Iceland" },
      { id: 214, value: "Cruise Holiday - Mediterranean" },
      { id: 215, value: "Nepal" },
      { id: 216, value: "Butan" },
      { id: 216, value: "China" },
    ],
  },
];
const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
});

api.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Force no-cache only on GET requests
    if (config.method === "get") {
      config.headers["Cache-Control"] = "no-cache";
      config.headers["Pragma"] = "no-cache";
      config.headers["Expires"] = "0";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized - maybe redirect to login");
      Router.push('/login');
      // Optionally: logout user, clear token, redirect, etc.
    }
    return Promise.reject(error);
  }
);

export default api;
