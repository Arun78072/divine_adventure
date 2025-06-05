import React from "react";
import DestinationStyle from "../destination.style";

export default function Tourdetails() {
  return (
    <DestinationStyle>
      <div className="booking_form">
        <div className="booking-form">
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
          <button className="btn primary">Check Availability</button>
          <button className="btn secondary">Book Now</button>
        </div>
      </div>
    </DestinationStyle>
  );
}
