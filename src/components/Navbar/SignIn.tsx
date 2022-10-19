import "../../CSS/nav.css";
import React, { useState, useRef } from "react";
interface myStates {
  setUserID: React.Dispatch<React.SetStateAction<string>>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const Modal = ({ setUserID, setModal }: myStates) => {
  // const inputRef = useRef("");
  let input: string;

  const userIDHandler = () => {
    // if (inputRef.current) {
    //   setUserID(inputRef.current.valueOf);
    // }
    setUserID(input);
  };

  return (
    <div className="signModal">
      <input id="input" type="text" placeholder="Enter a name" onChange={(e) => { input = e.target.value }} />
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
