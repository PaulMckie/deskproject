import { utils } from "../utils.tsx";
import Desk from "../components/Desk.tsx";
import { isPropertySignature } from "typescript";
import { deskRow } from "./interface/deskInterface.tsx";
import React, { FC } from "react";

interface MyProps {
  row: number;
}

// generates 5 desks in a row
const DeskRow: FC<MyProps> = ({ row }) => {
  return (
    <div className="DeskRow">
      {utils.range(1, 5).map((deskNumber: number) => (
        <Desk key={deskNumber} row={row} deskNum={deskNumber} />
      ))}
    </div>
  );
};

export default DeskRow;
