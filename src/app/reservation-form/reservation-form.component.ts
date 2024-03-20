import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit{

  reservationForm : FormGroup = new FormGroup({});

  //Injection
  constructor(private builder : FormBuilder, private service:ReservationService, private router:Router
    , private activatedRoute : ActivatedRoute){}

  //Lifecycle Hooks
  ngOnInit(): void {
    this.reservationForm = this.builder.group({
      guestName : ['', Validators.required],
      guestEmail : ['', [Validators.required, Validators.email]],
      checkInDate : ['', Validators.required],
      checkOutDate : ['', Validators.required],
      roomNo : ['', Validators.required],
    })

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id){
      let res = this.service.getReservation(parseInt(id));
      if(res){
        this.reservationForm.patchValue(res);
      }
    }
  }


  onSubmit(){
    if(this.reservationForm.valid){

      let id = this.activatedRoute.snapshot.paramMap.get('id');
      if(id)
        this.service.updateReservation(parseInt(id), this.reservationForm.value);
      else
        this.service.addReservation(this.reservationForm.value);
      this.router.navigate(['/all']);
    }

  }

}
