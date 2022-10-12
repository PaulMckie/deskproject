import React, { ReactElement, useState, FC } from "react";
import { deskInfo, deskRow } from "../interface/deskInterface.tsx";
import { deskInfoClass } from "../Classes/deskInfoClass.tsx";
import "../Desk.css";

interface MyProps {
  deskNum: deskInfo;
  row: deskRow;
}

const Desk: FC<MyProps> = ({ deskNum, row }) => {
  const self = new deskInfoClass(row, deskNum);
  console.log(row, "i am desk num interface");

  return (
    <button
      id={self.getDeskID().toString()}
      className="Desk"
      onClick={(e) => {
        self.toggleDeskBook();
      }}
    >
      {self.getDeskID()}
    </button>
  );
};

export default Desk;
