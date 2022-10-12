import { ReactElement, useState } from "react";
import { deskInfo } from './interface/deskInterface';
import { deskInfoClass } from "./Classes/deskInfoClass";
import './Desk.css';

export function Desk(props: deskInfo): ReactElement {
    const self = new deskInfoClass(props.row, props.deskNum);

    return (
        <button id={self.getDeskID().toString()} className="Desk" onClick={() => { self.toggleDeskBook() }}>{self.getDeskID()}</button>
    );
}