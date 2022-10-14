import { useState } from "react";
import { IDeskAvailability } from "../interface/deskInterface.tsx";

interface bookingDate {
  bookingDay: IDeskAvailability;
  bookingMonth: IDeskAvailability;
  bookingYear: IDeskAvailability;
  bookingUserID: IDeskAvailability;
}

export class deskInfoClass {
  private deskID: number;
  private bookedStatus: bookingDate[];

  //todo private privacyMode: boolean;

  // Initialise the class
  constructor(deskNum: number) {
    this.deskID = deskNum;
    this.bookedStatus = [];
  }

  // Add or remove the current booking from the Desks memory
  public toggleDeskBook(userID: string, date: Date): void {
    if (this !== undefined) {
      const buttonElement: HTMLElement = document.getElementById(
        `${this.deskID}`
      )!;

      // Build booking object
      const bookingDate: bookingDate = {
        bookingDay: date.getDate(),
        bookingMonth: date.getMonth(),
        bookingYear: date.getFullYear(),
        bookingUserID: userID,
      }

      // console.log(this.bookedStatus, 'i am booked status');
      // console.log(bookingDate, 'i am booking date')

      // const result: bookingDate[] = this.bookedStatus.filter(function(el) {
      // return bookedStatus.splice(0,1,el)
      // });

      let result: bookingDate | undefined = undefined;
      let counter: number = 0;
      let index: number = 0;

      // Search for current booking in Desks memory
      this.bookedStatus.forEach(bookedDate => {
        if (bookedDate.bookingDay === bookingDate.bookingDay && bookedDate.bookingMonth === bookingDate.bookingMonth && bookedDate.bookingYear === bookingDate.bookingYear && bookedDate.bookingUserID === bookingDate.bookingUserID) {
          result = bookedDate;
          index = counter;
        }
        counter++;
      });

      // If desk is alrerady booked remove from the desks memory
      if (result !== undefined) {
        this.bookedStatus.splice(index, 1);
        // console.log(`Unbooked table ${this.deskID}!`);
      }
      // If booking isn't in the desks memory add it
      else {
        this.bookedStatus.push(bookingDate);
        // console.log(this.bookedStatus, 'i am booked status');
        // console.log(`${userID} booked table ${this.deskID}!`);
      }

      // if (!this.bookedStatus) {
      //   this.bookedStatus.push(bookedDate);
      //   console.log(`${userID} booked table ${this.deskID}!`);
      //   // buttonElement.style.backgroundColor = "red";
      // } else {
      //   this.bookedStatus = !this.bookedStatus;
      //   console.log(`Unbooked table ${this.deskID}!`);
      //   // buttonElement.style.backgroundColor = "green";
      // }
    }
  }

  // Getter for Desk ID
  public getDeskID(): number {
    return this.deskID;
  }

  // Getter for booked dates
  public getBookedStatus(): bookingDate[] {
    return this.bookedStatus;
  }

  // Provide way to find out if a desk is booked for a given date
  public isDateBooked(userID: string, date: Date): number | string {

    let status: number | string = 0;

    // Search through all bookings
    this.bookedStatus.forEach(bookedDate => {
      // Check if a booking is for the given date
      if (bookedDate !== undefined && bookedDate.bookingDay === date.getDate() && bookedDate.bookingMonth === date.getMonth() && bookedDate.bookingYear === date.getFullYear()) {
        // If the user on the booking is the same as the current booking user return 2
        if (bookedDate.bookingUserID === userID) {
          status = 2;
          return;
        }
        // If the user on the booking is different to the current booking user return the user who has the desk booked for that date
        else {
          status = bookedDate.bookingUserID;
          return;
        }
      }
    });

    return status;

  }
}
