import React, { ReactElement, FC, useState } from "react";
import { utils } from "./utils.tsx";
import Desk from "./components/Desk.tsx";
import "./CSS/App.css";
import Navbar from "./components/Navbar/Navbar.tsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// const Initialize = ():
//   | string
//   | React.Dispatch<React.SetStateAction<string>> => {
//   const [userID, setUserID] = useState("");
//   return { userID, setUserID };
// };

//utils - generates 5 rows
const App: FC = () => {
  const [userID, setUserID] = useState("Guest");
  console.log(userID, "i am user id state");
  const [startDate, setStartDate] = useState(new Date());
  console.log(userID, startDate);
  return (
    <div className="App">
      <Navbar setUserID={setUserID} />
      <div className="DeskLayout">
        {utils.range(1, 25).map((deskNumber: number) => (
          <Desk
            key={deskNumber}
            deskNum={deskNumber}
            bookingUserID={userID}
            bookingDate={startDate}
          />
        ))}
        <div className="calendar-container">
          <DatePicker
            className="Calendar"
            dateFormat="dd/MM/yyyy"
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
          />
        </div>
      </div>
      <p>DEMO Desk Booking System</p>
    </div>
  );
};

export default App;
