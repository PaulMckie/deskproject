// import { deskClass } from '../interface/deskInterface'
export class deskInfoClass {
    private deskID: number;
    private userID: string | undefined;
    private bookedStatus: boolean;
    //todo private privacyMode: boolean;

    constructor(deskNum: number) {
        this.deskID = deskNum;
        this.bookedStatus = false;
    }

    // toggle true or false for avalibility 
    public toggleDeskBook(): void {
        if (this !== undefined){
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
    }

    public getDeskID(): number {
        return this.deskID;
    }

    public getbookedStatus(): boolean {
        return this.bookedStatus;
    }

}

// type MyProps = {
//     userID: string | undefined;
//     deskID: number;
//     bookedStatus: boolean;
    
//     deskNum: number;
// };


// export class deskInfoClass extends React.Component<MyProps> {
//     // private deskID: number;
//     // private userID: string | undefined;
//     // private bookedStatus: boolean;
//     //todo private privacyMode: boolean;

//     constructor(props: MyProps) {
//         super(props);
//         props.deskID = ((props.row * 5) + props.deskNum);
//         props.bookedStatus = false;
//     }

//     // toggle true or false for avalibility 
//     public toggleDeskBook(props: MyProps): void {
//         const buttonElement: HTMLElement = document.getElementById(`${props.deskID}`)!;

//         if (!this.props.bookedStatus) {
//             props.bookedStatus = !this.props.bookedStatus;
//             console.log(`Booked table ${this.props.deskID}!`);
//             buttonElement.style.backgroundColor = 'red';
//         }
//         else {
//             props.bookedStatus = !this.props.bookedStatus;
//             console.log(`Unboked table ${props.deskID}!`);
//             buttonElement.style.backgroundColor = 'green';
//         }
//     }

//     getDeskID(props: MyProps): number {
//         return props.deskID;
//     }

//     getbookedStatus(props: MyProps): boolean {
//         return props.bookedStatus;
//     }

// }