export default function ConfirmationBox({
  open,
  title,
  handleClose,
  handleClick,
}) {
  return (
    <>
      {open ? (
        <>
          <div className="fixed left-[50%] top-[14%] bg-white p-4 transform -translate-x-1/2 z-50 rounded-lg">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <div className="mt-2 flex gap-2">
              <button className="bg-red-500 text-white py-2 px-4 rounded-md w-full" onClick={handleClose}>
                No
              </button>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full" onClick={handleClick}>
                Yes
              </button>
            </div>
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
