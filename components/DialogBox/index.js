import { DialougBoxStyle } from "@/styles/dialogBox.style";
import { CgClose } from "react-icons/cg";
export default function DialogBox({ open, onClose, children }) {
  return (
    <>
      {open ? (
        <DialougBoxStyle>
          <div className="dialoug_box">
            <button onClick={onClose} className="close_btn">
              <CgClose />
            </button>
            {children}
          </div>
          <div className="background_button" onClick={onClose}></div>
        </DialougBoxStyle>
      ) : (
        ""
      )}
    </>
  );
}
