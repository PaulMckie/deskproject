import { ReactElement, useState } from "react";
import { deskInfo } from "./interface/deskInterface.tsx";
import { deskInfoClass } from "./Classes/deskInfoClass.tsx";
import "./Desk.css";

export function Desk(props: deskInfo): ReactElement {
  const self = new deskInfoClass(props.row, props.deskNum);

  return (
    <button
      id={self.getDeskID().toString()}
      className="Desk"
      onClick={() => {
        self.toggleDeskBook();
      }}
    >
      {self.getDeskID()}
    </button>
  );
}
