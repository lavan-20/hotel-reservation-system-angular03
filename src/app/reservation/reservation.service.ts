import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  reservations: Reservation[] = [];

  constructor(){
    var savedReservations = localStorage.getItem("reservations");
    this.reservations = savedReservations?JSON.parse(savedReservations):[];
  }

  getReservations():Reservation[]{
    return this.reservations;
  }

  getReservation(id:number): Reservation | undefined{
    return this.reservations.find(res => res.id === id);
  }

  addReservation(res: Reservation): void{
    res.id = Date.now();
    this.reservations.push(res);
    localStorage.setItem("reservations",JSON.stringify(this.reservations));
  }

  updateReservation(id: number, res:Reservation):void{
    var index = this.reservations.findIndex(x => x.id === id)
    res.id = id;
    this.reservations[index] = res;
    localStorage.setItem("reservations",JSON.stringify(this.reservations));
  }

  deleteReservation(id:number):void{
    var index = this.reservations.findIndex(res => res.id === id);
    console.log(index);
    this.reservations.splice(index, 1);
    localStorage.setItem("reservations",JSON.stringify(this.reservations));
  }
}
