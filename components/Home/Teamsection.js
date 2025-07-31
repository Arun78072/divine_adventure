"use client";
import React from "react";
import styled from "styled-components";
import Image from "next/image";

// Dummy Team Data
const teamMembers = [
  {
    id: 1,
    name: "Rajesh Kumar",
    title: "CEO & Founder",
    image: "/assets/ceo2.jpeg",
  },
    {
    id: 3,
    name: "Pankaj",
    title: "Tour Manager",
    image: "/assets/pankaj.jpeg",
  },
  {
    id: 2,
    name: "Rahul Dhiman",
    title: "Travel Consultant",
    image: "/assets/rahul.jpeg",
  },

  {
    id: 4,
    name: "Nidhi Paul",
    title: "HR & Marketing Head",
    image: "/assets/HR.jpeg",
  },
  {
    id: 5,
    name: "Ranjeet Dhiman",
    title: "IT Head",
    image: "/assets/ranjeet.jpeg",
  },
  {
    id: 6,
    name: "Arun Kumar",
    title: "Fullstack Developer",
    image: "/assets/arun.jpeg",
  },
];

function Teamsection() {
  return (
    <TeamWrapper>
      <h2 className="team_title">Meet Our Team</h2>
      <div className="team_grid">
        {teamMembers.map((member) => (
          <div key={member.id} className="team_card">
            <div className="team_img">
              <Image
                src={member.image}
                alt={member.name}
                width={200}
                height={200}
              />
            </div>
            <h3 className="team_name">{member.name}</h3>
            <p className="team_title_text">{member.title}</p>
          </div>
        ))}
      </div>
    </TeamWrapper>
  );
}

export default Teamsection;

// Styled Components
const TeamWrapper = styled.section`
  padding: 60px 20px;
  text-align: center;

  .team_title {
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 40px;
    color: #222;
  }

  .team_grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    max-width: 1000px;
    margin: 0 auto;
  }

  .team_card {
    background: #fff;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    text-align: center;

    &:hover {
      transform: translateY(-5px);
    }
  }

  .team_img img {
    border-radius: 50%;
    object-fit: cover;
  }

  .team_name {
    margin-top: 15px;
    font-size: 20px;
    font-weight: 600;
    color: #111;
  }

  .team_title_text {
    font-size: 16px;
    color: #666;
    margin-top: 5px;
  }

  /* Responsive */
  @media (max-width: 992px) {
    .team_grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 600px) {
    .team_grid {
      grid-template-columns: 1fr;
    }
  }
`;
