export interface deskRow {
    row: number;
}

export interface deskInfo extends deskRow {
    deskNum: number;
}

export interface deskClass extends deskInfo {
    bookedStatus: boolean;
}