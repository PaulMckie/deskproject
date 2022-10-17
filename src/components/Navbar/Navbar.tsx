import React from "react";
import ReactDOM from "react-dom/client";
import "./nav.css";
import Modal from "./SignIn.tsx";
import { useState } from "react";
interface myStates {
  setUserID: React.Dispatch<React.SetStateAction<string>>;
}
const Navbar = ({ setUserID }: myStates) => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div>
          <p className="logo">Logo</p>
        </div>
        <ul>
          <li onClick={() => (modal ? setModal(false) : setModal(true))}>
            Sign-in
          </li>
          <li>FAQ</li>
        </ul>
      </nav>
      {modal ? (
        <div>
          <Modal setUserID={setUserID} setModal={setModal} />
        </div>
      ) : null}
    </>
  );
};

export default Navbar;
