export default function DialogBox({ open, children }) {
  return (
    <>
      {open ? (
        <>
          <div className="fixed left-[50%] top-[10%] bg-white p-4 transform -translate-x-1/2 z-50 rounded-lg w-96">
            {children}
          </div>
          <div
            // onClick={handleClose}
            className="cursor-pointer fixed w-full h-full bg-[#00000053] top-0 left-0 z-40 backdrop-blur-[2px]"
          ></div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
