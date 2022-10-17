import "../Navbar/nav.css";
import React, { useState, useRef } from "react";
interface myStates {
  setUserID: React.Dispatch<React.SetStateAction<string>>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const Modal = ({ setUserID, setModal }: myStates) => {
  const inputRef = useRef(null);

  const userIDHandler = () => {
    setUserID(inputRef.current.value);
  };

  return (
    <div className="signModal">
      <input id="input" ref={inputRef} type="text" placeholder="Enter a name" />
      <button
        onClick={() => {
          userIDHandler();
          setModal(false);
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default Modal;
