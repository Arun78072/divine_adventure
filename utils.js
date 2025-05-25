import { toast } from "react-toastify";
import axios from 'axios';

export const baseUrl = "http://localhost:3000";
// export const baseUrl = "https://spark.sdnaprod.com";

export const formateDate = (dates) => {
  const date = new Date(dates);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};

export const formatTimeAgo = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} sec ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hr ago`;

  return `${Math.floor(diffInSeconds / 86400)} days ago`;
};

export const nestReplies = (comments) => {
  const mainComments = comments.filter((comment) => !comment.commentId);

  const commentMap = mainComments.reduce((acc, comment) => {
    acc[comment._id] = { ...comment, reply: [] }; // Initialize reply array
    return acc;
  }, {});
  comments.forEach((comment) => {
    if (comment.commentId) {
      const parentComment = commentMap[comment.commentId];
      if (parentComment) {
        parentComment.reply.push(comment);
      }
    }
  });

  return Object.values(commentMap);
};

export const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  toast.success("Successfully copied the Spark ID!");
};




const api = axios.create({
  // process.env.NEXT_PUBLIC_API_BASE_URL || 
  baseURL: 'http://localhost:3000', // set your base API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
      console.warn('Unauthorized - maybe redirect to login');
      // Optionally: logout user, clear token, redirect, etc.
    }
    return Promise.reject(error);
  }
);

export default api;
