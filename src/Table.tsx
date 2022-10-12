import { ReactElement, useState } from "react";

function Table(): ReactElement {
    const [bookedState, setBookedState] = useState(false);

    const toggleTableBook = (): void => {
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
        <button onClick={() => { toggleTableBook() }}>I am a button click me!</button>
    );
}

export default Table;