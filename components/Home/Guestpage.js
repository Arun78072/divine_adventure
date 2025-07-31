"use client";
import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

const infoData = [
  {
    id: 1,
    title: "Ready to be inspired?",
    description: "Get your free brochure and plan your next escape.",
    buttonText: "Contacts",
    buttonLink: "/Connect",
    image: "/assets/inspired.png",
  },
  {
    id: 2,
    title: "5 million happy guests...",
    description:
      "...and counting. See what our past guests have to say.",
    buttonText: "View Tour",
    buttonLink: "/Tours",
    image: "/assets/guest.jpeg",
  },
];

function Guestpage() {
  return (
    <Wrapper>
      <Heading>
        We are the <span>world’s most loved tour company</span>
      </Heading>
      <CardGrid>
        {infoData.map((item) => (
          <Card key={item.id}>
            <ImageBox>
              <Image
                src={item.image}
                alt={item.title}
                width={80}
                height={80}
              />
            </ImageBox>
            <CardContent>
              <CardTitle>{item.title}</CardTitle>
              <CardDesc>{item.description}</CardDesc>
              <StyledLink href={item.buttonLink}>
                {item.buttonText}
              </StyledLink>
            </CardContent>
          </Card>
        ))}
      </CardGrid>
    </Wrapper>
  );
}

export default Guestpage;

// Styled Components
const Wrapper = styled.section`
  background: #4c2852;
  color: white;
  text-align: center;
  padding: 60px 20px;
`;

const Heading = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 40px;

  span {
    font-weight: 800;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
  justify-content: center;
  align-items: start;
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
  gap: 16px;
`;

const ImageBox = styled.div`
  flex-shrink: 0;
`;

const CardContent = styled.div``;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const CardDesc = styled.p`
  font-size: 14px;
  margin-bottom: 16px;
`;

const StyledLink = styled(Link)`
  background: #ff2c40;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
  text-decoration: none;
  display: inline-block;

  &:hover {
    background: #e02030;
  }
`;
