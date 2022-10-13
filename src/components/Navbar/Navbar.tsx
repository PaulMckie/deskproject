import React from "react";
import ReactDOM from "react-dom/client";
import "./nav.css";
import Modal from "./sign-in.tsx";
import { useState } from "react";

const Navbar = () => {
  const [modal, setModal] = useState(false);

  const btnHandle = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div>
          <p className="logo">Logo</p>
        </div>
        <ul>
          <li onClick={btnHandle}>Sign-in</li>
          <li>FAQ</li>
        </ul>
      </nav>
      {modal ? (
        <div>
          <Modal />
        </div>
      ) : null}
    </>
  );
};

export default Navbar;
