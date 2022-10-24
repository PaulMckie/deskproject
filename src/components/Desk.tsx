import React, { ReactElement, useState, FC } from "react";
import { IDeskInfo } from "../interface/deskInterface";
import { deskInfoClass } from "../Classes/deskInfoClass.tsx";
import "../CSS/Desk.css";

interface MyProps extends IDeskInfo {
  checkForBooking: (deskID: number) => { userID: string; bookingID: string; };
  requestBookings: (bookingDate: Date) => Promise<void>;
}

const Desk: FC<MyProps> = ({ deskID, bookingUserID, bookingDate, checkForBooking, requestBookings }) => {
  // Initialise deskInfoClass so that each desk has persistent memory
  const self: deskInfoClass = new deskInfoClass(deskID, checkForBooking, requestBookings);
  // Allow Desk cmponet to know whether it is selected or not
  const [selected, setSelected] = useState(false);

  // Handle different text for Modal depending on desk status
  const getModalText = (bookingUserID: string): string => {
    let text: string;

    let status: string;

    // Get Desk status if user is not Guest
    if (bookingUserID.toLowerCase() !== 'guest') {
      status = self.getUserID();
    }
    else {
      status = 'Guest';
    }

    // Status 0 = Unbooked Desk, 2 = Booked by current user, otherwise booked by a different user
    switch (status) {
      case 'Guest':
        text = `Guest is not allowed to book desks! Please sign in with a user name.`;
        break;
      case bookingUserID:
        text = `Desk ${self.getDeskID()} is already booked by yourself. Do you want to unbook it?`;
        break;
      case '':
        text = `You have selected desk ${self.getDeskID()} to book. Is this correct?`;
        break;
      default:
        text = `Desk ${self.getDeskID()} is already booked by ${status}.`;
        break;
    }
    return text;
  };

  // Handle desk colouration to indicate availability
  const getButtonColour = (checkUser: string): string => {

    const status: string = self.getUserID();

    // console.log(`Updating button colour`, self.getBookedStatus());

    // Status 0 = Unbooked Desk, 2 = Booked by current user, otherwise booked by a different user
    switch (status) {
      case '':
        return 'green'

      case checkUser:
        return 'purple'

      default:
        return 'red'
    }

  };

  // Handle if the Yes button is visible
  const handleYesHidden = (bookingUserID: string): string => {
    let status: string;

    // Get Desk status if user is not Guest
    if (bookingUserID.toLowerCase() !== 'guest') {
      status = self.getUserID();
    }
    else {
      status = 'Guest';
    }

    // Status 0 = Unbooked Desk show button, 2 = Booked by current user show button, otherwise booked by a different user hide button
    if ((status === '' || status === bookingUserID) && status !== 'Guest') {
      return 'inherit';
    }
    else {
      return 'none';
    }
  };

  // Handle the text the cancel button shows
  const handleCancelText = (bookingUserID: string): string => {
    const status: string = self.getUserID();

    // Status 0 = Unbooked Desk, 2 = Booked by current user, otherwise booked by a different user
    if ((status === '' || status === bookingUserID) && bookingUserID.toLowerCase() !== 'guest') {
      return 'No';
    }
    else {
      return 'Ok';
    }
  };

  return (
    <div className="DeskHolder">
      {/* Create Desk */}
      <button
        id={`${self.getDeskID()}`}
        className="Desk"
        // On Click set desk as selected
        onClick={() => {
          setSelected(true);
        }}
        // Dynamically change desk colour to inform user of availability
        style={{
          backgroundColor: getButtonColour(bookingUserID)
        }}
      >
        {/* Display Desk ID */}
        {self.getDeskID()}
      </button>
      {/* Create Desk Modal */}
      <div
        className="BookDeskModal"
        // Handle Display of Modal based on if the desk is selected
        style={{ display: selected === false ? "none" : "block" }}
      >
        <div className="BookDeskInterface">
          <span>
            {/* Get Text for the Modal */}
            <p>{getModalText(bookingUserID)}</p>
            <button
              // Handle Click of Confirmation to call desk booking function in class and then unselect the desk
              onClick={() => {
                self.handleBookingStatus(bookingUserID, bookingDate);
                setSelected(false);
              }}
              // Handle the display of the Confirmation button
              style={{
                display: handleYesHidden(bookingUserID)
              }}
            >
              Yes
            </button>
            <button
              // Handle Click of Cancel to unselect the desk
              onClick={() => {
                setSelected(false);
              }}
            >
              {/* Call function to get the correct text to display */}
              {handleCancelText(bookingUserID)}
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Desk;
