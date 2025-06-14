export default function GalleryTab({ data }) {
  console.log("data========>", data?.gallery?.image);
  return (
    <div className="gallery_section">
      <h2>
        Discover the spirit of travel through our gallery—where every image is a
        window into cultures, landscapes, and memories waiting to be made.
      </h2>

      <div className="gallery_box">
        {data?.gallery?.image.map((i) => (
          <img src={i} />
        ))}
      </div>
    </div>
  );
}
