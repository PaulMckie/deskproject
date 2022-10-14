import React, { ReactElement, useState, FC } from "react";
import { IDeskInfo } from "../interface/deskInterface.tsx";
import { deskInfoClass } from "../Classes/deskInfoClass.tsx";
import "../CSS/Desk.css";

interface MyProps {
  deskNum: IDeskInfo;
  bookingUserID: IDeskInfo;
  bookingDate: IDeskInfo;
}

const Desk: FC<MyProps> = ({ deskNum, bookingUserID, bookingDate }) => {
  // Initialise deskInfoClass so that each desk has persistent memory
  const [self, setSelf] = useState(new deskInfoClass(deskNum));
  // Allow Desk cmponet to know whether it is selected or not
  const [selected, setSelected] = useState(false);

  // Handle different text for Modal depending on desk status
  const getModalText = (bookingUserID: string, bookingDate: Date): string => {
    let text: string;

    let status: number | string;

    // Get Desk status if user is not Guest
    if (bookingUserID.toLowerCase() !== 'guest') {
      status = self.isDateBooked(bookingUserID, bookingDate);
    }
    else {
      status = 'Guest';
    }

    // Status 0 = Unbooked Desk, 2 = Booked by current user, otherwise booked by a different user
    if (status === 2) {
      text = `Desk ${self.getDeskID()} is already booked by yourself. Do you want to unbook it?`;
    } else if (status === 0) {
      text = `You have selected desk ${self.getDeskID()} to book. Is this correct?`;
    } else if (status === 'Guest') {
      text = `Guest is not allowed to book desks! Please sign in with a user name.`;
    } else {
      text = `Desk ${self.getDeskID()} is already booked by ${status}.`;
    }

    return text;
  };

  // Handle desk colouration to indicate availability
  const getButtonColour = (checkDate: Date): string => {

    const status = self.isDateBooked(bookingUserID, checkDate);

    // console.log(`Updating button colour`, self.getBookedStatus());

    // Status 0 = Unbooked Desk, 2 = Booked by current user, otherwise booked by a different user
    switch (status) {
      case 0:
        return 'green'

      case 2:
        return 'purple'

      default:
        return 'red'
    }

  };

  // Handle if the Yes button is visible
  const handleYesHidden = (bookingUserID: string, checkDate: Date): string => {
    let status: number | string;

    // Get Desk status if user is not Guest
    if (bookingUserID.toLowerCase() !== 'guest') {
      status = self.isDateBooked(bookingUserID, checkDate);
    }
    else {
      status = 'Guest';
    }

    // Status 0 = Unbooked Desk show button, 2 = Booked by current user show button, otherwise booked by a different user hide button
    if (status === 0 || status === 2) {
      return 'inherit';
    }
    else {
      return 'none';
    }
  };

  // Handle the text the cancel button shows
  const handleCancelText = (bookingUserID: string, checkDate: Date): string => {
    const status: number | string = self.isDateBooked(bookingUserID, checkDate);

    // Status 0 = Unbooked Desk, 2 = Booked by current user, otherwise booked by a different user
    if ((status === 2 || status === 0) && bookingUserID.toLowerCase() !== 'guest') {
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
        id={self.getDeskID().toString()}
        className="Desk"
        // On Click set desk as selected
        onClick={() => {
          setSelected(true);
        }}
        // Dynamically change desk colour to inform user of availability
        style={{
          backgroundColor: getButtonColour(bookingDate)
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
            <p>{getModalText(bookingUserID, bookingDate)}</p>
            <button
              // Handle Click of Confirmation to call desk booking function in class and then unselect the desk
              onClick={() => {
                self.toggleDeskBook(bookingUserID, bookingDate);
                setSelected(false);
              }}
              // Handle the display of the Confirmation button
              style={{
                display: handleYesHidden(bookingUserID, bookingDate)
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
              {handleCancelText(bookingUserID, bookingDate)}
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Desk;
