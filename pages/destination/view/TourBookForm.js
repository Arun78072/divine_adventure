import { DestinationStyle } from "@/styles/destination.style";
import React from "react";

export default function TourBookForm() {
  return (
    <DestinationStyle>
        <div>
          <h2>Book This Tour</h2>
          <p>
            Ex optio sequi et quos praesentium in nostrum labore nam rerum iusto
            aut magni nesciunt? Quo quidem neque iste expedita est dolo.
          </p>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="email" placeholder="Confirm Email" />
          <input type="tel" placeholder="Phone" />
          <input type="number" placeholder="Number of people" />
          <textarea placeholder="Message"></textarea>
          <button className="primary_button">Book Now</button>
        </div>
    </DestinationStyle>
  );
}
