import React from "react";
import Link from "next/link";
import {
  BlogSectionWrapper,
  Heading,
  BlogGrid,
  BlogCard,
  BlogImage,
  BlogTitle,
} from "./BlogSection.styles";

// Api for getting all blogs   : /api/blog/blog_get_by_id
const blogs = [
  {
    id: "687d0325d8d5c33d9a3ba157",
    title: "Amarnath Yatra 2025 – Route, Dates and All You Need to Know",
    image: "/assets/blog1.jpg",
  },
  {
    id: "687d0325d8d5c33d9a3ba157",
    title: "Top Lonavala Waterfalls That You Must Visit This Monsoon",
    image: "/assets/blog2.jpg",
  },
  {
    id: "687d0325d8d5c33d9a3ba157",
    title: "10 Best Places for Shopping in Thailand in 2025",
    image: "/assets/blog3.jpg",
  },
];

export default function Blogs() {
  return (
    <BlogSectionWrapper className="container">
      <Heading>Reading Corner</Heading>
      <BlogGrid>
        {blogs.map((blog, index) => (
          <BlogCard key={index}>
            <Link href={`blog/view/${blog.id}`}>
              <BlogImage src={blog.image} alt={blog.title} />

              <BlogTitle>{blog.title}</BlogTitle>
            </Link>
          </BlogCard>
        ))}
      </BlogGrid>
    </BlogSectionWrapper>
  );
}
