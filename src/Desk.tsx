import { ReactElement, useState } from "react";
import { deskInfo } from "./interface/deskInterface.tsx";
import { deskInfoClass } from "./Classes/deskInfoClass.tsx";
import "./Desk.css";

export function Desk(props: deskInfo): ReactElement {
    const [self, setSelf] = useState(new deskInfoClass(props.deskNum));

    const [selected, setSelected] = useState(false);

    const getModalText = (): string => {
        let text: string;

        if (self.getbookedStatus()) {
            text = `Desk ${self.getDeskID()} is already booked. Do you want to unbook it?`;
        }
        else {
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
            >
                {self.getDeskID()}
            </button>
            <div className='BookDeskModal' style={{ display: (selected === false) ? 'none' : 'block' }}>
                <div className='BookDeskInterface'>
                    <span>
                        <p>{getModalText()}</p>
                        <button onClick={() => { self.toggleDeskBook(); setSelected(false) }}>Yes</button>
                        <button onClick={() => { setSelected(false) }}>No</button>
                    </span>
                </div>
            </div>
        </div>
    );
}
