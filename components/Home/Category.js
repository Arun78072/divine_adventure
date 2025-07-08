import { ServiceCard } from "@/styles/home.style";
import Image from "next/image";
import React from "react";

export default function Category() {
  return (
    <ServiceCard>
      <div className="container">
        <div className="category_container">
          <h1 className="category_title">We Offer Best Services</h1>
          <div className="card_section">
            <div className="category_card">
              <span className="category_image">
                <Image src="/assets/tour_guide.png" width={60} height={60} />
              </span>
              <h3 className="card_heading">Guided Tours</h3>
              <p className="card_text">
                sunt qui repellat saepe quo velit aperiam id aliquam placeat.
              </p>
            </div>
            <div className="category_card">
              <span className="category_image">
                <Image src="/assets/travelling.png" width={60} height={60} />
              </span>
              <h3 className="card_heading">Best Flights Options</h3>
              <p className="card_text">
                sunt qui repellat saepe quo velit aperiam id aliquam placeat.
              </p>
            </div>
            <div className="category_card">
              <span className="category_image">
                <Image src="/assets/medical_team.png" width={60} height={60} />
              </span>
              <h3 className="card_heading">Guided Tours</h3>
              <p className="card_text">
                sunt qui repellat saepe quo velit aperiam id aliquam placeat.
              </p>
            </div>
            <div className="category_card">
              <span className="category_image">
                <Image src="/assets/travelling.png" width={60} height={60} />
              </span>
              <h3 className="card_heading">Best Flights Options</h3>
              <p className="card_text">
                sunt qui repellat saepe quo velit aperiam id aliquam placeat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ServiceCard>
  );
}
