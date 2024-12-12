import { Injectable } from '@angular/core';

export interface SeatSchema {
  seatNo: number;
  status: string;
  userId: number | null;
}

@Injectable({ providedIn: 'root' })
export class Database {
  seats: SeatSchema[] = [];
  vacantSeats: number = 80;
  constructor() {
    this.initializeDatabase();
  }
  initializeDatabase(): void {
    for (let i = 0; i < 80; i++) {
      this.seats.push({
        seatNo: i + 1,
        status: 'vacant',
        userId: null,
      });
    }
  }
  book({ seatNo, status = 'vacant', userId }: SeatSchema) {
    if(status=='booked') this.vacantSeats--;
    const index = this.seats.findIndex((seat) => seat.seatNo === seatNo);
    this.seats[index] = { ...this.seats[index], status, userId };
  }
}
