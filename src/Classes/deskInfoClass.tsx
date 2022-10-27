import React, { useState } from "react";
import { IDeskAvailability, IDeskInfo } from "../interface/deskInterface";

interface bookingDate {
  deskID: number;
  date: string;
}

interface booking extends bookingDate {
  userName: string;
}

// export class deskInfoClass {
//   private deskID: number;
//   private bookings: booking[];

//   //todo private privacyMode: boolean;

//   // Initialise the class
//   constructor(deskNum: number) {
//     this.deskID = deskNum;
//     this.bookings = [];
//   }

//   // Add or remove the current booking from the Desks memory
//   public toggleDeskBook(userID: string, date: Date): void {
//     if (this !== undefined) {
//       const buttonElement: HTMLElement = document.getElementById(
//         `${this.deskID}`
//       )!;

//       // Build booking object
//       const bookingRequest: booking = {
//         bookingDate: date,
//         bookingUserID: userID,
//       }

//       // console.log(this.bookedStatus, 'i am booked status');
//       // console.log(bookingDate, 'i am booking date')

//       // const result: bookingDate[] = this.bookedStatus.filter(function(el) {
//       // return bookedStatus.splice(0,1,el)
//       // });

//       let result: booking | undefined = undefined;
//       let counter: number = 0;
//       let index: number = 0;

//       // Search for current booking in Desks memory
//       this.bookings.forEach(booking => {
//         if (booking.bookingDate === bookingRequest.bookingDate && booking.bookingUserID === bookingRequest.bookingUserID) {
//           result = booking;
//           index = counter;
//           break;
//         }
//         counter++;
//       });

//       // If desk is alrerady booked remove from the desks memory
//       if (result !== undefined) {
//         this.bookings.splice(index, 1);
//         // console.log(`Unbooked table ${this.deskID}!`);
//       }
//       // If booking isn't in the desks memory add it
//       else {
//         this.bookings.push(bookingRequest);
//         // console.log(this.bookedStatus, 'i am booked status');
//         // console.log(`${userID} booked table ${this.deskID}!`);
//       }

//       // if (!this.bookedStatus) {
//       //   this.bookedStatus.push(bookedDate);
//       //   console.log(`${userID} booked table ${this.deskID}!`);
//       //   // buttonElement.style.backgroundColor = "red";
//       // } else {
//       //   this.bookedStatus = !this.bookedStatus;
//       //   console.log(`Unbooked table ${this.deskID}!`);
//       //   // buttonElement.style.backgroundColor = "green";
//       // }
//     }
//   }

//   // Getter for Desk ID
//   public getDeskID(): number {
//     return this.deskID;
//   }

//   // Getter for booked dates
//   public getBookings(): booking[] {
//     return this.bookings;
//   }

//   // Provide way to find out if a desk is booked for a given date
//   public isDateBooked(userID: string, date: Date): number | string {

//     let status: number | string = 0;

//     // Search through all bookings
//     this.bookings.forEach(booking => {
//       // Check if a booking is for the given date
//       if (booking !== undefined && booking.bookedDate === date) {
//         // If the user on the booking is the same as the current booking user return 2
//         if (bookedDate.bookingUserID === userID) {
//           status = 2;
//           return;
//         }
//         // If the user on the booking is different to the current booking user return the user who has the desk booked for that date
//         else {
//           status = bookedDate.bookingUserID;
//           return;
//         }
//       }
//     });

//     return status;

//   }
// }

export class deskInfoClass {
  private deskID: number;
  private userID: string;
  private bookingID: string;
  private checkForBooking: (deskID: number) => {
    userID: string;
    bookingID: string;
  };
  private requestBookings: (bookingDate: Date) => Promise<void>;
  private setSelected: React.Dispatch<React.SetStateAction<boolean>>;
  //todo private privacyMode: boolean;

  // Initialise the class
  constructor(
    deskNum: number,
    checkForBooking: (deskID: number) => { userID: string; bookingID: string },
    requestBookings: (bookingDate: Date) => Promise<void>,
    setSelected: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    this.deskID = deskNum;
    this.checkForBooking = checkForBooking;
    this.requestBookings = requestBookings;
    this.setSelected = setSelected;
    // Place GET request to find if desk has a booking for the current date here
    this.requestBookingStatus();
  }

  private async requestBookingStatus(): Promise<void> {
    let userID: string;
    let bookingID: string;

    ({ userID, bookingID } = this.checkForBooking(this.deskID));

    this.userID = userID;
    this.bookingID = bookingID;
  }

  private async postBooking(booking: booking): Promise<void> {
    console.log(JSON.stringify(booking));

    const response: Response = await fetch("http://localhost:4000/booking/", {
      method: "POST",
      body: JSON.stringify(booking),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      this.userID = booking.userName;
      console.log("Desk booked with following info: " + response);
    }
  }

  private async deleteBooking(booking: bookingDate): Promise<void> {
    const response: Response = await fetch(
      "http://localhost:4000/booking/" + this.bookingID,
      {
        method: "DELETE",
        body: JSON.stringify(booking),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      this.userID = "";
      this.bookingID = "";
    }
  }

  // Add or remove the current booking from the Desks memory
  public async handleBookingStatus(userID: string, date: Date): Promise<void> {
    if (!this.userID) {
      // Place POST request with date, desk ID and user ID
      const newBooking: booking = {
        deskID: this.deskID,
        userName: userID,
        date: date.toISOString().substring(0, 10),
      };

      await this.postBooking(newBooking);
    } else {
      // Place DELETE request with date and desk ID
      const removeBooking: bookingDate = {
        deskID: this.deskID,
        date: date.toISOString().substring(0, 10),
      };

      await this.deleteBooking(removeBooking);
    }
    console.log("Re-getting bookings");
    await this.requestBookings(date);
    console.log("Re-request complete");
    await this.requestBookingStatus();
    console.log("new status received");
    this.setSelected(false);
  }

  // Getter for Desk ID
  public getDeskID(): number {
    return this.deskID;
  }

  // Provide way to find out if a desk is booked for a given date
  public getUserID() {
    return this.userID;
  }
}
