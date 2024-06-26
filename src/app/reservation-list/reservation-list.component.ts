import { Component, OnInit } from '@angular/core';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../reservation/reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {
  
  reservations:Reservation[] =[];

  constructor(private service:ReservationService){}

  /* With local storage
  ngOnInit(): void {
    this.reservations = this.service.getReservations();
  }
  onDelete(id: number) {
    this.service.deleteReservation(id);
  } */

  //With Mock API
  ngOnInit(): void {
    this.service.getReservations().subscribe(value => this.reservations = value);
    console.log("Reservations (GET) processed.")
  }
  onDelete(id: number) {
    this.service.deleteReservation(id).subscribe(() => console.log("Delete reservation processed."));
  }

}
