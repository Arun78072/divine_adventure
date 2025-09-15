import axios from "axios";
import Router from "next/router";

export const baseUrl = "https://www.adventuredivine.com/";
// export const baseUrl = "http://localhost:4000";

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
      localStorage.clear()
      Router.push("/login");
      // Optionally: logout user, clear token, redirect, etc.
    }
    return Promise.reject(error);
  }
);

export default api;


export async function fetchWithCache(key, fetcher) {
  const cachedData = localStorage.getItem(key);

  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);

    // check if cache is older than 1 day (24h = 86400000ms)
    if (Date.now() - timestamp < 86400000) {
      return data; // ✅ return cached data
    }
  }

  // fetch new data
  const data = await fetcher();

  // save to localStorage
  localStorage.setItem(
    key,
    JSON.stringify({
      data,
      timestamp: Date.now(),
    })
  );

  return data;
}
