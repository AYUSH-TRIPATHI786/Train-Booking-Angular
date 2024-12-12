import { Component } from '@angular/core';
import { SeatSchema, Database } from '../../services/db.service';

@Component({
  selector: 'ticket',
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss'
})
export class TicketComponent {
  constructor(private db: Database) {}

  count = 1;
  bookedSeats: SeatSchema[] = [];
  error = ''
  bookedSeatsList() {
    return this.bookedSeats.map(seat=>seat.seatNo).join(', ')
  }
  updateCount(event: Event): void {
    this.count = Number((event?.target as HTMLInputElement)?.value || 0);
  }
  submitForm(): void {
    if(this.count>this.db.vacantSeats) {
      this.error = this.count + ' seats are not available.'
      return 
    }
    this.error = ""

    let seatsToBook = this.count;
    this.bookedSeats = [];
    
    // check if seats can be booked in this row
    let i=0;
    while(i < this.db.seats.length && seatsToBook>0){
      let seat: SeatSchema = this.db.seats[i];
      if (seat.status === 'vacant') {
        if(i<77 ? 7-i%7>=seatsToBook : 3-i%7>=seatsToBook ){
          this.bookSeat(seat)
          seatsToBook--;
        }else{
          i=(Math.floor(i/7)+1)*7;
          continue;
        }
      }
      i++;
    }
    
    // book the seats in different rows.
    i=0;
    while(i < this.db.seats.length && seatsToBook>0){
      let seat: SeatSchema = this.db.seats[i];
      if (seat.status === 'vacant') {
        this.bookSeat(seat)
        seatsToBook--;
      }
      i++;
    }
  }
  bookSeat(seat: SeatSchema){
    this.db.book({
      seatNo: seat.seatNo,
      status: 'booked',
      userId: 100, // can be replaced with exact userId if login implementated
    });
    this.bookedSeats.push(seat);
  }
}
