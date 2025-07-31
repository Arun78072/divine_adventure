import { AboutStyle } from "@/styles/about.style";
import React from "react";
import Image from "next/image";
import Teamsection from "@/components/Home/Teamsection";

export default function About() {
  return (
    <AboutStyle className="container">
      <div className="about_container">
        <h1 className="about_title">About Divine Adventure Tours</h1>
         <section className="about_section founder_section">
          <h2 className="about_subtitle">Meet Our Founder</h2>
          <div className="founder_container">
            <Image
              src="/assets/ceo2.jpeg" // add CEO image here in public/assets/ceo.jpg
              alt="Rajesh Kumar - CEO Divine Adventure"
              width={160}
              height={160}
              className="founder_image"
            />
            <div>
              <h3 className="founder_name">Rajesh Kumar</h3>
              <p className="about_text">
                Rajesh Kumar, the visionary founder and CEO of Divine Adventure, 
                started this journey more than <strong>10 years ago</strong> with 
                a mission to make travel more meaningful, safe, and accessible. 
                His passion for exploring the world and creating memorable 
                experiences has been the driving force behind our growth and 
                reputation as a trusted travel partner.
              </p>
              <p className="about_text">
                Today, under his leadership, Divine Adventure has become a 
                well-loved name in the industry, delivering countless unforgettable 
                journeys across India and beyond.
              </p>
            </div>
          </div>
        </section>
        <p className="about_text">
          Welcome to <strong>Divine Adventure Tour & Travel</strong>, your
          trusted partner in creating unforgettable journeys. We specialize in
          crafting personalized <strong>national and international trips</strong> 
          that combine adventure, culture, and comfort. Our mission is to guide 
          you through extraordinary travel experiences while ensuring every detail 
          is taken care of with expertise.
        </p>

        <section className="about_section">
          <h2 className="about_subtitle">Why Travel With Us?</h2>
          <p className="about_text">
            At Divine Adventure, we believe that every journey is a story waiting 
            to be told. Whether you dream of exploring the beauty of India or 
            experiencing global destinations, our team of expert travel guides and 
            storytellers ensures a seamless, memorable experience. 
          </p>
          <p className="about_text">
            From comfortable accommodations to curated itineraries, we take care of 
            everything so you can simply relax and enjoy your journey.
          </p>
        </section>

        <section className="about_section">
          <h2 className="about_subtitle">Our Expertise</h2>
          <ul className="about_list">
            <li>
              <strong>National Tours:</strong> Discover India’s rich heritage, 
              breathtaking landscapes, and cultural diversity with our handpicked 
              domestic travel packages.
            </li>
            <li>
              <strong>International Tours:</strong> Experience the world’s most 
              exciting destinations with customized itineraries designed just for you.
            </li>
            <li>
              <strong>Personalized Travel:</strong> From solo trips to group 
              adventures, we tailor every trip to match your style and preferences.
            </li>
          </ul>
        </section>

        <section className="about_section">
          <h2 className="about_subtitle">Our Promise</h2>
          <p className="about_text">
            Traveling with Divine Adventure means traveling with a partner who 
            values <strong>your comfort, safety, and happiness</strong>. Our team 
            is dedicated to providing exceptional services and unforgettable 
            memories that last a lifetime.
          </p>
        </section>

        {/* Founder Section */}
        
      </div>
    <Teamsection />

    </AboutStyle>
  );
}
