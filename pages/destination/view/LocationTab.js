export default function LocationTab({ data }) {
  return (
    <div className="location_section">
      <h2 >Tour Location</h2>
      <h3>Location Address: {data?.location?.address}</h3>
      <p>{data?.location?.note}</p>
      {data?.location?.locationLink && (
        <iframe
          src={data.location.locationLink}
          width="100%" // optional if also using style.width
          height="450"
          style={{
            width: "100%",
            border: 0,
            borderRadius: "10px",
            margin: "30px 0px",
          }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map"
        ></iframe>
      )}

     
    </div>
  );
}
