import { ReactElement, useState } from "react";
import { deskInfo } from './interface/deskInterface';

export function Desk(props: deskInfo): ReactElement {
    const [bookedState, setBookedState] = useState(false);

    // function to create id based on row num + desk num
    const createDeskID = (row: number, deskNum: number) => {
        return ((row * 5) + deskNum);

    };

    const deskID: number = createDeskID(props.row, props.deskNum);

    // toggle true or false for avalibility 
    const toggleDeskBook = (): void => {
        if (!bookedState) {
            setBookedState(!bookedState);
            console.log(`Booked table ${deskID}!`);
        }
        else {
            setBookedState(!bookedState);
            console.log(`Unboked table ${deskID}!`);
        }
    }

    const deskStyle = (): string => {
        if (bookedState) {
            return 'red';
        }
        else {
            return 'green';
        }
    };

    return (
        <button style={{ backgroundColor: deskStyle() }} onClick={() => { toggleDeskBook() }}>{deskID}</button>
    );
}