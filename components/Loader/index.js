export default function Loader({ loading }) {
  return (
    <>
    {loading ? (
      <div className="overlay">
        <div className="loader"></div>
      </div>
    ) : (
      <></>
    )}
  </>  
  );
}
