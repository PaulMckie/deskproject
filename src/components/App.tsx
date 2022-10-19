import React, { ReactElement, FC, useState } from "react";
import { utils } from "../utils.tsx";
import Desk from "./Desk.tsx";
import "../CSS/App.css";
import Navbar from "./Navbar/Navbar.tsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//utils - generates 5 rows
const App: FC = () => {
  // Initialise User ID to Guest User
  const [userID, setUserID] = useState("Guest");
  // console.log(userID, "i am user id state");
  // Initialise Start Date to todays date
  const [startDate, setStartDate] = useState(new Date());
  // console.log(userID, startDate);
  return (
    <div className="App">
      {/* Create Navbar */}
      <Navbar setUserID={setUserID} />
      {/* Create Desk Layout and populate with 25 desks ID 1-25 as well as the calendar */}
      <div className="DeskLayout">
        {utils.range(1, 25).map((deskNumber: number) => (
          <Desk
            key={deskNumber}
            deskNum={deskNumber}
            bookingUserID={userID}
            bookingDate={startDate}
          />
        ))}
        {/* Create Calendar with sensible date format */}
        <div className="calendar-container">
          <DatePicker
            className="Calendar"
            dateFormat="dd/MM/yyyy"
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
          />
        </div>
      </div>
      <h2>{userID}</h2>
      <p>DEMO Desk Booking System</p>
    </div>
  );
};

export default App;
