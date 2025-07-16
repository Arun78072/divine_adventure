import { ReviewSection } from "@/styles/home.style";
import React from "react";
import { FaRegUser } from "react-icons/fa";

export default function Review() {
  return (
    <ReviewSection>
      <div className="review_section">
        <div className="container">
          <h2 className="category_title">See What Our Clients Say About Us</h2>

          <div className="review_card">
            <div className="user_image">
              <FaRegUser />
            </div>
            <p className="review_discription">
              Vel officiis dolor ea illo aut eligendi ullam non laudantium
              magnam et recusandae molestiae sit iure unde aut voluptate
              quaerat. Id sunt provident quo possimus impedit vel doloremque
              obcaecati qui ullam consectetur et ipsum omnis.
            </p>
            <h4 className="review_author">Christine Beckam - Designer</h4>
          </div>
        </div>
      </div>
    </ReviewSection>
  );
}
