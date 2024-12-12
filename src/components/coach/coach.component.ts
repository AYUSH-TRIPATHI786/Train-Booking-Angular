import { Component } from '@angular/core';
import { Database } from '../../services/db.service';

@Component({
  selector: 'coach',
  templateUrl: './coach.component.html',
  styleUrl: './coach.component.scss'
})
export class CoachComponent {
  constructor(private db: Database) {}
  seatList() {
    return this.db.seats
  }
  isSelected(seatNo:number) {
    return !!this.db.seats.find(seat=> seat.seatNo==seatNo)
  }
}
