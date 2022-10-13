export interface IDeskAvailability {
  bookingUserID: string;
  bookingDay: number;
  bookingMonth: number;
  bookingYear:number;
}

export interface IDeskInfo{
  deskNum: number;
  bookingUserID: string;
  bookingDate: Date;
}