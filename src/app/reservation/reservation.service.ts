import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  reservations: Reservation[] = [];

  /* With local storage
  
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
  }*/

  //With mock API

  apiBaseURL = "http://localhost:3001";

  constructor(private client:HttpClient){
    var savedReservations = localStorage.getItem("reservations");
    this.reservations = savedReservations?JSON.parse(savedReservations):[];
  }

  getReservations():Observable<Reservation[]>{
    return this.client.get<Reservation[]>(this.apiBaseURL + "/reservations");
  }

  getReservation(id:number): Observable<Reservation>{
    return this.client.get<Reservation>(this.apiBaseURL+ "/reservation/" + id);
  }

  addReservation(res: Reservation): Observable<void>{
    return this.client.post<void>(this.apiBaseURL+ "/reservation", res);
  }

  updateReservation(id: number, res:Reservation):Observable<void>{
    return this.client.put<void>(this.apiBaseURL+ "/reservation/"+id, res);
  }

  deleteReservation(id:number):Observable<void>{
    return this.client.delete<void>(this.apiBaseURL+ "/reservation/" + id);
  }
}
