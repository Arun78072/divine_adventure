export default function ConfirmationBox({
  open,
  title,
  handleClose,
  handleClick,
}) {
  return (
    <div className="confirmation_box">
    {open ? (
      <>
        <div className="confirmation_modal">
          <h2 className="confirmation_title">{title}</h2>
          <div className="confirmation_buttons">
            <button className="btn_cancel" onClick={handleClose}>
              No
            </button>
            <button className="btn_confirm" onClick={handleClick}>
              Yes
            </button>
          </div>
        </div>
        <div
          // onClick={handleClose}
          className="confirmation_overlay"
        ></div>
      </>
    ) : (
      ""
    )}
  </div>
  
  );
}
