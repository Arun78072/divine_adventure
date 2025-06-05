import Image from "next/image";

export default function TourPlanTab({ data }) {
  console.log("data ======>", data.tourPlan);
  return (
    <div className="tour_plan">
      <h2 className="title">Tour plan</h2>

      {data.tourPlan.map((item, index) => (
        <div className="day_section">
          <span>{index + 1}</span>
          <h3>
            Day {index + 1}: {item.title}
          </h3>
          {item?.locationImage ? 
          <Image
              src={item?.locationImage}
              alt={item.title}
              width={40}
              height={40}
              sizes="100vw"
          style={{ width: "600px", height: "400px" ,objectFit:'cover' ,borderRadius:'10px'}}
            
            /> :''}

          <p>{item.description}</p>
          <ul>
            {item.list?.map((i, ix) => (
              <li>{i}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
