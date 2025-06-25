// components/BlogSection.styles.js
import styled from 'styled-components';

export const BlogSectionWrapper = styled.section`
  padding: 40px 20px;
`;

export const Heading = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #333;
`;

export const BlogGrid = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

export const BlogCard = styled.div`
  flex: 1 1 calc(33.333% - 20px);
  max-width: calc(33.333% - 20px);
  background: #fff;
  overflow: hidden;
  cursor: pointer;

`;

export const BlogImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 6px;
`;

export const BlogTitle = styled.p`
  margin-top: 12px;
  font-size: 16px;
  font-weight: 500;
  color: #c20f0f;
  border-bottom: 3px solid #c20f0f;
  padding-bottom: 4px;
`;
