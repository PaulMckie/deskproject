import { ReactElement, useState } from "react";

export function Desk(): ReactElement {
    const [bookedState, setBookedState] = useState(false);

    const toggleDeskBook = (): void => {
        if (!bookedState) {
            setBookedState(!bookedState);
            console.log('Table Booked!');
        }
        else {
            setBookedState(!bookedState);
            console.log('Table Unbooked!');
        }
    }

    return (
        <button onClick={() => { toggleDeskBook() }}>I am a button click me!</button>
    );
}