export default function Loader({ loading }) {
  return (
    <>
      {loading ? (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-[2px] z-[9999]">
          <div className="loader"></div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
