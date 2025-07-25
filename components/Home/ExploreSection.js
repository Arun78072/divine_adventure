"use client";
import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

const exploreData = [
  {
    id: 1,
    title: "Perfect Honeymoon Packages",
    description:
      "Explore serene beaches, peaceful hill stations, and cozy resorts for unforgettable moments with your partner. Book now for a perfect romantic getaway!",
    buttonText: "View Honeymoon Packages",
    link: "indian-tour/201-honeymoon-packages",
    coverImage: "/assets/honeymoon.jpg",
  },
  {
    id: 2,
    title: "Beat the heat with Touron's summer packages!",
    description:
      "Explore hill stations, sunny beaches, and thrilling adventures. Book now for a refreshing getaway!",
    buttonText: "View Summer Packages",
    link: "indian-tour/103-jammu-and-kashmir-tour-packages",
    coverImage: "/assets/summer.jpg",
  },
];

function ExploreSection() {
  return (
    <Section>
      {exploreData.map((item) => (
        <Card key={item.id}>
          <Background>
            <Image
              src={item.coverImage}
              alt={item.title}
              layout="fill"
              objectFit="cover"
              quality={90}
            />
            <Overlay />
          </Background>
          <CardContent>
            <div>
              <Title>{item.title}</Title>
              <Desc>{item.description}</Desc>
            </div>
            <Link href={item.link} className="link">
              {item.buttonText} →
            </Link>
          </CardContent>
        </Card>
      ))}
    </Section>
  );
}

export default ExploreSection;

// Styled Components
const Section = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  padding: 40px;
`;

const Card = styled.div`
  position: relative;
  height: 400px;
  border-radius: 6px;
  overflow: hidden;
`;

const Background = styled.div`
  position: absolute;
  inset: 0;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent 60%);
  z-index: 1;
`;

const CardContent = styled.div`
  position: relative;
  z-index: 2;
  color: white;
  padding: 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .link {
    background: white;
    color: black;
    padding: 10px 16px;
    border-radius: 6px;
    font-weight: 500;
    font-size: 14px;
    text-decoration: none;
    width: fit-content;
    transition: background 0.3s ease;

    &:hover {
      background: #f0f0f0;
    }
  }
`;

const Title = styled.h3`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const Desc = styled.p`
  font-size: 14px;
  line-height: 1.5;
`;
