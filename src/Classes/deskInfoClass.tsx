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

  constructor(deskNum: number) {
    this.deskID = deskNum;
    this.bookedStatus = [];
  }

  // toggle true or false for avalibility
  public toggleDeskBook(userID: string, date: Date): void {
    if (this !== undefined) {
      const buttonElement: HTMLElement = document.getElementById(
        `${this.deskID}`
      )!;

      const bookingDate: bookingDate = {
        bookingDay: date.getDate(),
        bookingMonth: date.getMonth(),
        bookingYear: date.getFullYear(),
        bookingUserID: userID,
      }

      console.log(this.bookedStatus, 'i am booked status');
      console.log(bookingDate, 'i am booking date')

      // const result: bookingDate[] = this.bookedStatus.filter(function(el) {
        // return bookedStatus.splice(0,1,el)
      // });

      let result: bookingDate | undefined = undefined;
      let counter: number = 0;
      let index: number = 0;

      this.bookedStatus.forEach(bookedDate => {
        if (bookedDate.bookingDay === bookingDate.bookingDay && bookedDate.bookingMonth === bookingDate.bookingMonth && bookedDate.bookingYear === bookingDate.bookingYear && bookedDate.bookingUserID === bookingDate.bookingUserID ) {
          result = bookedDate;
          index = counter;
        }
        counter++;
      });

      if (result !== undefined) {
        this.bookedStatus.splice(index, 1);
        console.log(`Unbooked table ${this.deskID}!`);
      }
      else {
        this.bookedStatus.push(bookingDate);
        console.log(this.bookedStatus, 'i am booked status');
        console.log(`${userID} booked table ${this.deskID}!`);
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

  public getDeskID(): number {
    return this.deskID;
  }

  public getBookedStatus(): bookingDate[] {
    return this.bookedStatus;
  }

  public isDateBooked(userID: string, date: Date): number | string{

    let status: number | string = 0;

    this.bookedStatus.forEach(bookedDate => {
      if (bookedDate !== undefined && bookedDate.bookingDay === date.getDate() && bookedDate.bookingMonth === date.getMonth() &&bookedDate.bookingYear === date.getFullYear()){
        if (bookedDate.bookingUserID === userID) {
          status = 2;
          return;
        }
        else {
          status = bookedDate.bookingUserID;
          return;
        }
      }
    });

    return status;

  }
}
