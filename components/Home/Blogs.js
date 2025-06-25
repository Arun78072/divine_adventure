import React from 'react';
import {
  BlogSectionWrapper,
  Heading,
  BlogGrid,
  BlogCard,
  BlogImage,
  BlogTitle,
} from './BlogSection.styles';

const blogs = [
  {
    title: "Amarnath Yatra 2025 – Route, Dates and All You Need to Know",
    image: "/assets/blog1.jpg",
  },
  {
    title: "Top Lonavala Waterfalls That You Must Visit This Monsoon",
    image: "/assets/blog2.jpg",
  },
  {
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
            <BlogImage src={blog.image} alt={blog.title} />
            <BlogTitle>{blog.title}</BlogTitle>
          </BlogCard>
        ))}
      </BlogGrid>
    </BlogSectionWrapper>
  );
}
