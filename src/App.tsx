import React, { useState, useRef } from "react";
import "./App.css";
import { DeskRow } from "./DeskRow.tsx";
import { utils } from "./utils.tsx";
import { Desk } from "./Desk.tsx"

const Initialise = (): any => {
  const userID = "User";
  return { userID };
};

//utils - generates 5 rows
export function App(): any {
  const { userID } = Initialise();

  return (
    <div className="App">
      <p>DEMO Desk Booking System</p>
      <div className="DeskLayout">
        {utils.range(1, 25).map((deskNumber: number) => (
          <Desk key={deskNumber} deskNum={deskNumber} />
        ))}
      </div>
    </div>
  );
}
