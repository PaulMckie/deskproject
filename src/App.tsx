import React, { ReactElement, FC, useState } from "react";
import { utils } from "./utils.tsx";
import Desk from "./components/Desk.tsx";
import "./CSS/App.css";
import Navbar from "./components/Navbar/Navbar.tsx";

// const Initialise = (): any => {
//   const userID = "User";
//   return { userID };
// };

//utils - generates 5 rows
const App: FC = () => {
  // const { userID } = Initialise();

  return (
    <div className="App">
      <Navbar />
      <p>DEMO Desk Booking System</p>
      <div className="DeskLayout">
        {utils.range(1, 25).map((deskNumber: number) => (
          <Desk key={deskNumber} deskNum={deskNumber} />
        ))}
      </div>
    </div>
  );
};

export default App;
