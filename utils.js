import { toast } from "react-toastify";
import axios from "axios";

export const baseUrl = "http://localhost:3000";

export const tourTypeOption = [
  {
    id: 1,
    value: "India",
    children: [
      { id: 101, value: "Char Dham Yatra" },
      { id: 102, value: "Honeymoon Tour" },
      { id: 103, value: "Adventure Tour" },
      { id: 104, value: "Pilgrimage Tour" },
      { id: 105, value: "Wildlife Safari" },
      { id: 106, value: "Beach Retreats" },
      { id: 107, value: "Heritage & Historical Tour" },
      { id: 108, value: "Hill Station Getaway" },
      { id: 109, value: "Desert Safari Rajasthan" },
      { id: 110, value: "Luxury Train Experience" },
      { id: 111, value: "Yoga & Wellness Retreat" },
      { id: 112, value: "Backwater Cruise - Kerala" },
      { id: 113, value: "Cultural Exploration" },
      { id: 114, value: "North East India Discovery" },
      { id: 115, value: "South India Temple Trail" },
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
    ],
  },
];

const api = axios.create({
  baseURL: "http://localhost:3000",
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
      // Optionally: logout user, clear token, redirect, etc.
    }
    return Promise.reject(error);
  }
);

export default api;
