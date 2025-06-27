import Tourdetails from "./Tourdetails";
import { Information } from "@/styles/destination.style";

export default function InformationTab({ data }) {
  console.log("postData =======>", data);
  return (
    <Information>
      <section className="tour-container">
        <div className="tour-header">
          <div className="left">
            <h1>{data?.tourInfo?.title}</h1>
            <p className="price">
              {data?.tourInfo?.price} <span>/ Per Couple</span>
            </p>
            <p className="reviews">⭐⭐⭐⭐⭐ (2.3k reviews)</p>
            <p className="description">{data?.tourInfo?.description}</p>
            <div className="tour-details">
              <p>
                <strong>Destination:</strong>{" "}
                {data?.tourInfo?.destination.join(", ")}
              </p>
              <p>
                <strong>Departure:</strong> {data?.tourInfo?.depature}
              </p>
              <p>
                <strong>Travel Days:</strong> {data?.tourInfo?.travelDays}
              </p>
              <p>
                <strong>Travel Country:</strong> {data?.tourInfo?.travelCountry}
              </p>
              <p>
                <strong>Travel City:</strong> {data?.tourInfo?.travelCity}
              </p>
              <p>
                <strong>Travel Night:</strong> {data?.tourInfo?.travelNight}
              </p>
            
           

              <p>
                <strong>Not Included:</strong>{" "}
                {data?.tourInfo?.notInclude?.join(", ")}
              </p>
              <p>
                <strong>Included:</strong> {data?.tourInfo?.include?.join(", ")}
              </p>
            </div>
          </div>

          <div className="right">
            {" "}
            <Tourdetails />
          </div>
        </div>

        <div className="gallery-section">
          <div className="gallery-left">
            <h2>From our gallery</h2>
            <p>
              Ex optio sequi et quos praesentium in nostrum labore nam rerum
              iusto aut magni nesciunt?
              <br />
              Quo quidem neque iste expedita est dolor similique ut quasi maxime
              ut deserunt autem At praesentium voluptatem aut libero nisi.
            </p>

            <div className="gallery-grid">
              <img src="/assets/info1.png" alt="Scenery 1" />
              <img src="/assets/info2.png" alt="Scenery 2" />
              <img src="/assets/info3.png" alt="Scenery 3" />
              <img src="/assets/info4.png" alt="Scenery 4" />
              <img src="/assets/info5.png" alt="Scenery 5" />
              <img src="/assets/info6.png" alt="Scenery 6" />
            </div>
          </div>

          <div className="gallery-right">
            <img src="/assets/tour345.jpg" alt="Travel Decoration" />
          </div>
        </div>
      </section>
    </Information>
  );
}
