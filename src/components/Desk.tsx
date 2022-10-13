import React, { ReactElement, useState, FC } from "react";
import { IDeskInfo } from "../interface/deskInterface.tsx";
import { deskInfoClass } from "../Classes/deskInfoClass.tsx";
import "../CSS/Desk.css";

interface MyProps {
  deskNum: IDeskInfo;
  userID: IDeskInfo;
}

const Desk: FC<MyProps> = ({ deskNum, userID }) => {
  const [self, setSelf] = useState(new deskInfoClass(deskNum));

  const [selected, setSelected] = useState(false);

  const getModalText = (): string => {
    let text: string;

    if (self.getBookedStatus() && userID === self.userID) {
      text = `Desk ${self.getDeskID()} is already booked by yourself. Do you want to unbook it?`;
    } else if (self.getBookedStatus()) {
      text = `Desk ${self.getDeskID()} is already booked by ${self.userID}.`;
    } else {
      text = `You have selected desk ${self.getDeskID()} to book. Is this correct?`;
    }

    return text;
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
          backgroundColor: !self.getBookedStatus()
            ? "green"
            : userID === self.userID
            ? "purple"
            : "red",
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
            <p>{getModalText()}</p>
            <button
              onClick={() => {
                self.toggleDeskBook(userID);
                setSelected(false);
              }}
              style={{
                display:
                  self.getBookedStatus() && userID !== self.userID
                    ? "none"
                    : "inherit",
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
