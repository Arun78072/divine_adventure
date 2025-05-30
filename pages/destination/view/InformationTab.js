import Image from "next/image";
import Head from "next/head";
// import styles from "@/styles/tour";
import Information from "./information.style";
export default function InformationTab() {
  return (
    <Information>
      <Head>
        {/* <title>Switzerland Tour Details</title> */}
      </Head>
      <section className="tour-container">
        <div className="tour-header">
          <div className="left">
            <h1>Switzerland</h1>
            <p className="price">1,000 $ <span>/ Per Couple</span></p>
            <p className="reviews">⭐⭐⭐⭐⭐ (2.3k reviews)</p>
            <p className="description">
              Ex optio sequi et quos praesentium in nostrum labore nam rerum iusto aut magni nesciunt?
              Quo quidem neque iste expedita est dolor similique ut quasi maxime ut deserunt autem.
            </p>

            <div className="tour-details">
              <p><strong>Destination:</strong> Zurich, Switzerland</p>
              <p><strong>Departure:</strong> Main Square, New City</p>
              <p><strong>Departure Time:</strong> Approx. 09:00 AM</p>
              <p><strong>Return Time:</strong> Approx. 06:00 PM</p>
              <p><strong>Dress Code:</strong> Comfortable and light</p>
              <p><strong>Not Included:</strong> Gallery Ticket, Lunch</p>
              <p><strong>Included:</strong> Tour & Accommodation, Breakfast, Personal Guide</p>
            </div>
          </div>

          <div className="right">
            <div className="booking-form">
              <h2>Book This Tour</h2>
              <p>Ex optio sequi et quos praesentium in
                 nostrum labore nam rerum iusto aut magni
                  nesciunt? Quo quidem neque iste expedita
                   est dolo.</p>
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
        </div>

        <div class="gallery-section">
  <div class="gallery-left">
    <h2>From our gallery</h2>
    <p>
      Ex optio sequi et quos praesentium in nostrum labore nam rerum iusto aut magni nesciunt?<br />
      Quo quidem neque iste expedita est dolor similique ut quasi maxime ut deserunt autem At praesentium voluptatem aut libero nisi.
    </p>
    
    <div class="gallery-grid">
      <img src="/assets/info1.png" alt="Scenery 1" />
      <img src="/assets/info2.png" alt="Scenery 2" />
      <img src="/assets/info3.png" alt="Scenery 3" />
      <img src="/assets/info4.png" alt="Scenery 4" />
      <img src="/assets/info5.png" alt="Scenery 5" />
      <img src="/assets/info6.png" alt="Scenery 6" />
    </div>
  </div>

  <div class="gallery-right">
    <img src="/assets/tour345.jpg" alt="Travel Decoration" />
  </div>


        </div>
      </section>
    </Information>
  );
} 
