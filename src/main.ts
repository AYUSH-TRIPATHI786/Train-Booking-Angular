import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { TicketComponent } from './components/ticket/ticket.component';
import { CoachComponent } from './components/coach/coach.component';

@Component({
  selector: 'app-root',
  imports: [TicketComponent,CoachComponent],
  template: `
    <ticket/>
    <coach/>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
