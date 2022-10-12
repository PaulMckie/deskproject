// import { deskClass } from '../interface/deskInterface'
export class deskInfoClass {
    private deskID: number;
    private userID: string | undefined;
    private bookedStatus: boolean;
    //todo private privacyMode: boolean;

    constructor(row: number, deskNum: number) {
        this.deskID = ((row * 5) + deskNum);
        this.bookedStatus = false;
    }

    // toggle true or false for avalibility 
    public toggleDeskBook(): void {
        const buttonElement: HTMLElement = document.getElementById(`${this.deskID}`)!;

        if (!this.bookedStatus) {
            this.bookedStatus = !this.bookedStatus;
            console.log(`Booked table ${this.deskID}!`);
            buttonElement.style.backgroundColor = 'red';
        }
        else {
            this.bookedStatus = !this.bookedStatus;
            console.log(`Unboked table ${this.deskID}!`);
            buttonElement.style.backgroundColor = 'green';
        }
    }

    getDeskID(): number {
        return this.deskID;
    }

    getbookedStatus(): boolean {
        return this.bookedStatus;
    }

}