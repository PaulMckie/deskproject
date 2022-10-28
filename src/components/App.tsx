import React, { ReactElement, FC, useState, useEffect } from "react";
import { utils } from "../utils.tsx";
import Desk from "./Desk.tsx";
import "../CSS/App.css";
import Navbar from "./Navbar/Navbar.tsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { start } from "repl";

//utils - generates 5 rows
const App: FC = () => {
  // Initialise User ID to Guest User
  const [userID, setUserID] = useState("Guest");
  // console.log(userID, "i am user id state");
  // Initialise Start Date to todays date
  const [startDate, setStartDate] = useState(new Date());
  // console.log(userID, startDate);

  const [bookings, setBookings] = useState<any>();
  const [deskIDsBooked, setDeskIDsBooked] = useState<number[]>([]);

  useEffect(() => {
    requestBookings(startDate);
  }, []);
  const requestBookings: (bookingDate: Date) => Promise<void> = async (
    bookingDate: Date
  ) => {
    console.log(
      "Attempting to get booking for " +
        bookingDate.toISOString().substring(0, 10)
    );
    const response: Response = await fetch(
      "http://localhost:4000/booking/date/" +
        bookingDate.toISOString().substring(0, 10),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("This is the response: " + response);
    let newBookings: any;
    let newDeskIDsBooked: number[] = [];
    if (response.ok) {
      newBookings = await response.json();

      // all booked desks for this date - DESKID
      if (newBookings.bookings) {
        newBookings.bookings.forEach((booking) => {
          console.log(booking.deskID);

          newDeskIDsBooked.push(Number(booking.deskID));
        });
      } else {
        newBookings.forEach((booking) => {
          console.log(booking.deskID);

          newDeskIDsBooked.push(Number(booking.deskID));
        });
      }
    }
    // full boooking info for date - OBJECT
    setBookings(newBookings);
    setDeskIDsBooked(newDeskIDsBooked);
    console.log(newBookings, "i am booking with json");
    console.log("Bookings Collected");
  };
  console.log(deskIDsBooked, "i am outta function");

  const checkForBooking: (deskID: number) => {
    userID: string;
    bookingID: string;
  } = (deskID: number) => {
    let userID: string = "";
    let bookingID: string = "";

    console.log(deskID + " is checking it's status!");

    if (deskIDsBooked.includes(deskID)) {
      if (bookings.bookings) {
        bookings.bookings.forEach((booking) => {
          if (Number(booking.deskID) === deskID) {
            userID = booking.userName;
            bookingID = booking._id;
            return;
          }
        });
      } else {
        bookings.forEach((booking) => {
          if (Number(booking.deskID) === deskID) {
            userID = booking.userName;
            bookingID = booking._id;
            return;
          }
        });
      }
    }

    return { userID, bookingID };
  };

  // requestBookings(startDate);

  return (
    <div className="App">
      {/* Create Navbar */}
      <Navbar setUserID={setUserID} />
      {/* Create Desk Layout and populate with 25 desks ID 1-25 as well as the calendar */}
      <div className="DeskLayout">
        {utils.range(1, 25).map((deskNumber: number) => (
          <Desk
            key={deskNumber}
            deskID={deskNumber}
            bookingUserID={userID}
            bookingDate={startDate}
            checkForBooking={checkForBooking}
            requestBookings={requestBookings}
          />
        ))}
        {/* Create Calendar with sensible date format */}
        <div className="calendar-container">
          <DatePicker
            className="Calendar"
            dateFormat="dd/MM/yyyy"
            selected={startDate}
            onChange={async (date: Date) => {
              setStartDate(date);
              await requestBookings(date);
            }}
          />
        </div>
      </div>
      <h2>{userID}</h2>
      <p>DEMO Desk Booking System</p>
    </div>
  );
};

export default App;
