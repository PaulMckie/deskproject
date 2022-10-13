import React, { ReactElement, FC, useState } from "react";
import { utils } from "./utils.tsx";
import Desk from "./components/Desk.tsx";
import "./CSS/App.css";
import Navbar from "./components/Navbar/Navbar.tsx";

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

  return (
    <div className="App">
      <Navbar setUserID={setUserID} />
      <p>DEMO Desk Booking System</p>
      <div className="DeskLayout">
        {utils.range(1, 25).map((deskNumber: number) => (
          <Desk key={deskNumber} deskNum={deskNumber} userID={userID} />
        ))}
      </div>
    </div>
  );
};

export default App;
