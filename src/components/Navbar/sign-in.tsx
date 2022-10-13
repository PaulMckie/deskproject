import "../Navbar/nav.css";
import React, { useState, useRef } from "react";
interface myStates {
  setUserID: React.Dispatch<React.SetStateAction<string>>;
}
const Modal = ({ setUserID }: myStates) => {
  const inputRef = useRef(null);

  const userIDFunc = (e) => {
    setUserID(inputRef.current.value);
  };

  return (
    <div className="signModal">
      <input id="input" ref={inputRef} type="text" />
      <button
        onClick={(e) => {
          userIDFunc(e);
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default Modal;
