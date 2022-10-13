import { useState } from "react";

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
    if (this !== undefined) {
      const buttonElement: HTMLElement = document.getElementById(
        `${this.deskID}`
      )!;

      if (!this.bookedStatus) {
        this.bookedStatus = !this.bookedStatus;
        console.log(`Booked table ${this.deskID}!`);
        buttonElement.style.backgroundColor = "red";
      } else {
        this.bookedStatus = !this.bookedStatus;
        console.log(`Unbooked table ${this.deskID}!`);
        buttonElement.style.backgroundColor = "green";
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
