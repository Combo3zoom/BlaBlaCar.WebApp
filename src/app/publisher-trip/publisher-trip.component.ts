import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { TripModel } from '../../model/trip';
import { TripService } from '../services/trip.service';
import {User} from "../../model/user";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-publisher-trip',
  templateUrl: './publisher-trip.component.html',
  styleUrls: ['./publisher-trip.component.css']
})
export class PublisherTripComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  trips: TripModel[] = []; // Define and initialize the trips array
  private readonly unsubscribe$ = new Subject<void>();

  constructor(private tripService: TripService, private userService: UserService) {}

  ngOnInit() {
    this.createForm();
    this.getTrips(); // Call the method to fetch the trips data
  }

  private createForm() {
    this.form = new FormGroup({
      startRoute: new FormControl(null, [Validators.required]),
      endRoute: new FormControl(null, [Validators.required]),
      departureAt: new FormControl(null, [Validators.required]),
    });
  }

  private getTrips() {
    this.tripService.getTrips()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((currentTrips: TripModel[]) => {
        this.trips = currentTrips;
        console.log("current trips", currentTrips);
      });
  }

  shareTrip() {
    const startRoute = this.form.controls['startRoute'].value;
    const endRoute = this.form.controls['endRoute'].value;
    const departureAt = this.form.controls['departureAt'].value;

    this.tripService.createTrip(startRoute, endRoute, departureAt)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((currentTrip: TripModel) => {
        this.trips.push(currentTrip); // Add the newly created trip to the trips array
        console.log('currentUser', currentTrip);
        this.form.reset();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  isUserVerified(): boolean {
    this.userService.getMe().subscribe((currentUser:User)=>{
      return currentUser?.isVerification || false
    })

    return false;
  }
}
