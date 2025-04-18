import { toast } from "react-toastify";

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
