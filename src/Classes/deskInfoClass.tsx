import { useState } from "react";

export class deskInfoClass {
  private deskID: number;
  private userID: string;
  private bookedStatus: boolean;
  //todo private privacyMode: boolean;

  constructor(deskNum: number) {
    this.deskID = deskNum;
    this.bookedStatus = false;
    this.userID = "";
  }

  // toggle true or false for avalibility
  public toggleDeskBook(userID: string): void {
    if (this !== undefined) {
      const buttonElement: HTMLElement = document.getElementById(
        `${this.deskID}`
      )!;

      if (!this.bookedStatus) {
        this.bookedStatus = !this.bookedStatus;
        this.userID = userID;
        console.log(`${this.userID} booked table ${this.deskID}!`);
        // buttonElement.style.backgroundColor = "red";
      } else {
        this.bookedStatus = !this.bookedStatus;
        this.userID = "";
        console.log(`Unbooked table ${this.deskID}!`);
        // buttonElement.style.backgroundColor = "green";
      }
    }
  }

  public getDeskID(): number {
    return this.deskID;
  }

  public getBookedStatus(): boolean {
    return this.bookedStatus;
  }
}
