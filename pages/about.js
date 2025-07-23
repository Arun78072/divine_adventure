import { AboutStyle } from "@/styles/about.style";
import React from "react";

export default function About() {
  return (
    <AboutStyle className="container">
      <div className="about_container">
        <h1 className="about_title">About Divine Adventure Tours</h1>

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
      </div>
    </AboutStyle>
  );
}
