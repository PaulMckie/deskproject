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
  const [self, setSelf] = useState(new deskInfoClass(deskNum));
  const [selected, setSelected] = useState(false);

  const getModalText = (bookingUserID: string, bookingDate: Date): string => {
    let text: string;

    const status: number = self.isDateBooked(bookingUserID, bookingDate);

    if (status === 2) {
      text = `Desk ${self.getDeskID()} is already booked by yourself. Do you want to unbook it?`;
    } else if (status === 0) {
      text = `You have selected desk ${self.getDeskID()} to book. Is this correct?`;
    } else {
      text = `Desk ${self.getDeskID()} is already booked by ${status}.`;
    }

    return text;
  };

  const getButtonColour = (checkDate: Date): string => {

    const status = self.isDateBooked(bookingUserID, checkDate);

    // console.log(`Updating button colour`, self.getBookedStatus());

    switch (status) {
      case 0:
        return 'green'
      
      case 2:
        return 'purple'
      
      default:
        return 'red'
    }

  };

  const handleYesHidden = (bookingUserID: string, checkDate: Date): string => {
    const status = self.isDateBooked(bookingUserID, checkDate);

    if (status === 0 || status === 2) {
      return 'inherit';
    }
    else {
      return 'none';
    }
  };

  return (
    <div className="DeskHolder">
      <button
        id={self.getDeskID().toString()}
        className="Desk"
        onClick={() => {
          setSelected(true);
        }}
        style={{
          backgroundColor: getButtonColour(bookingDate)
        }}
      >
        {self.getDeskID()}
      </button>
      <div
        className="BookDeskModal"
        style={{ display: selected === false ? "none" : "block" }}
      >
        <div className="BookDeskInterface">
          <span>
            <p>{getModalText(bookingUserID, bookingDate)}</p>
            <button
              onClick={() => {
                self.toggleDeskBook(bookingUserID, bookingDate);
                setSelected(false);
              }}
              style={{
                display: handleYesHidden(bookingUserID, bookingDate)
              }}
            >
              Yes
            </button>
            <button
              onClick={() => {
                setSelected(false);
              }}
            >
              No
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Desk;
