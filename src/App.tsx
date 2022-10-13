import React, { ReactElement, FC, useState } from "react";
import "./CSS/App.css";
import DeskRow from "./components/DeskRow.tsx";
import { utils } from "./utils.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";

//utils - generates 5 rows
const App: FC = () => {
  // const userID = "User";
  return (
    <div className="App">
      <Navbar />
      <p>DEMO Desk Booking System</p>
      {utils.range(0, 4).map((rowNumber: number) => (
        <DeskRow key={rowNumber} row={rowNumber} />
      ))}
    </div>
  );
};

export default App;
