import axios from "axios";
import Router from "next/router";

// export const baseUrl = "https://divine-adventure.vercel.app/";
export const baseUrl = "http://localhost:3000";

export const tourTypeOption = [
  {
    id: 1,
    key:'india',
    value: "India",
    category: [
      {
        key: "indianTour",
        value: "Indian Tour",
        tours: [
          {
  id: 101,
  value: "India Tour Packages",
  description:
    "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
  coverImage:
    "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
},
{
  id: 102,
  value: "Maharashtra Tour Packages",
  description:
    "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
  coverImage:
    "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
},
{
  id: 103,
  value: "Jammu And Kashmir Tour Packages",
  description:
    "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
  coverImage:
    "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
},
{
  id: 104,
  value: "Kerala Tour Packages",
  description:
    "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
  coverImage:
    "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
},
{
  id: 105,
  value: "Goa Tour Packages",
  description:
    "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
  coverImage:
    "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
},
{
  id: 106,
  value: "Bhutan Tour Packages",
  description:
    "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
  coverImage:
    "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
},
{
  id: 107,
  value: "Sri Lanka Tour Packages",
  description:
    "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
  coverImage:
    "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
},
{
  id: 108,
  value: "Nepal Tour Packages",
  description:
    "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
  coverImage:
    "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
},
{
  id: 109,
  value: "Himachal Tour Packages",
  description:
    "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
  coverImage:
    "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
},
{
  id: 110,
  value: "Andaman And Nicobar Tour Packages",
  description:
    "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
  coverImage:
    "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
},
{
  id: 111,
  value: "Ladakh Tour Packages",
  description:
    "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
  coverImage:
    "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
},
{
  id: 112,
  value: "Rajasthan Tour Packages",
  description:
    "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
  coverImage:
    "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
},
{
  id: 113,
  value: "Char Dham Tour Packages",
  description:
    "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
  coverImage:
    "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
},
{
  id: 114,
  value: "Uttarakhand Tour Packages",
  description:
    "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
  coverImage:
    "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
},
{
  id: 115,
  value: "Sikkim And West Bengal Tour Packages",
  description:
    "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
  coverImage:
    "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
},
{
  id: 116,
  value: "Ayodhya Tour Packages",
  description:
    "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
  coverImage:
    "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
},
{
  id: 117,
  value: "Cordelia Cruises Tour Packages",
  description:
    "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
  coverImage:
    "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
},

        ],
      },
      {
        key: "honeyMoonTour",
        value: "Honey Moon Tour",
        tours: [
         {
  id: 201,
  value: "Honeymoon Packages",
  description:
    "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
  coverImage:
    "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
},
{
  id: 202,
  value: "India Honeymoon Packages",
  description:
    "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
  coverImage:
    "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
},
{
  id: 203,
  value: "Goa Honeymoon Packages",
  description:
    "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
  coverImage:
    "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
},
{
  id: 204,
  value: "Ooty Honeymoon Packages",
  description:
    "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
  coverImage:
    "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
},
{
  id: 205,
  value: "Coorg Honeymoon Packages",
  description:
    "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
  coverImage:
    "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
},
{
  id: 206,
  value: "Bhutan Honeymoon Packages",
  description:
    "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
  coverImage:
    "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
},
{
  id: 207,
  value: "Jammu And Kashmir Honeymoon Packages",
  description:
    "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
  coverImage:
    "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
},
{
  id: 208,
  value: "Kerala Honeymoon Packages",
  description:
    "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
  coverImage:
    "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
},
{
  id: 209,
  value: "Andaman And Nicobar Islands Honeymoon Packages",
  description:
    "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
  coverImage:
    "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
},
{
  id: 210,
  value: "Manali Honeymoon Packages",
  description:
    "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
  coverImage:
    "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
},
{
  id: 211,
  value: "Munnar Honeymoon Packages",
  description:
    "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
  coverImage:
    "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
},
{
  id: 212,
  value: "Shimla Honeymoon Packages",
  description:
    "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
  coverImage:
    "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
},
{
  id: 213,
  value: "Darjeeling Honeymoon Packages",
  description:
    "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
  coverImage:
    "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
},

        ],
      },
      {
        key: "indianSpecial",
        value: "Indian Special",
        tours: [
         {
  id: 301,
  value: "Air Inclusive Tour Packages",
  description:
    "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
  coverImage:
    "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
},
{
  id: 302,
  value: "Wildlife & Safari Packages",
  description:
    "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
  coverImage:
    "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
},
{
  id: 303,
  value: "Spiritual Journeys",
  description:
    "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
  coverImage:
    "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
},
{
  id: 304,
  value: "Bike Tour Packages",
  description:
    "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
  coverImage:
    "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
},
{
  id: 305,
  value: "Short Getaway Tour Packages",
  description:
    "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
  coverImage:
    "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
},
{
  id: 306,
  value: "Sporty Getaway",
  description:
    "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
  coverImage:
    "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
},
{
  id: 307,
  value: "Ramayan Trails",
  description:
    "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
  coverImage:
    "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
},
{
  id: 308,
  value: "Luxury Train Tour Packages",
  description:
    "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
  coverImage:
    "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
},
{
  id: 309,
  value: "Buy 1 Get 1 Free Domestic Tour Packages",
  description:
    "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
  coverImage:
    "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
},

        ],
      },
    ],
  },
  {
    id: 2,
    key:'international',
    value: "International",
    category: [
      {
        key: "indianTour",
        value: "Indian Tour",
        tours: [
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
        key: "honeyMoonTour",
        value: "Honey Moon Tour",
        tours: [
          {
            id: 201,
            value: "Char Dham Yatra",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 202,
            value: "Honeymoon Tour",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
        ],
      },
      {
        key: "indianSpecial",
        value: "Indian Special",
        tours: [
          {
            id: 301,
            value: "Char Dham Yatra",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 302,
            value: "Honeymoon Tour",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
        ],
      },
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
      Router.push("/login");
      // Optionally: logout user, clear token, redirect, etc.
    }
    return Promise.reject(error);
  }
);

export default api;