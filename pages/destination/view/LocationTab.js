export default function LocationTab({data}) {
  return (
    <div className="">
      <h2 className="">Location tour</h2>
      <p>Address : {data?.location?.address}</p>
      
      {data?.location?.locationLink && (
  <iframe
    src={'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d32630.16500524916!2d76.298565690255!3d32.216776879752125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391b50df65bd7311%3A0x3e08bdb100c6dc10!2sDharamshala%2C%20Himachal%20Pradesh!5e1!3m2!1sen!2sin!4v1748882121179!5m2!1sen!2sin'}
    // src={data.location.locationLink}
    width="600"
    height="400"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title="Google Map"
  ></iframe>
)}


    </div>
  );
}