import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TripModel} from "../../model/trip";
import {Subject, takeUntil} from "rxjs";
import {TripService} from "../services/trip.service";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-found-trip',
  templateUrl: './found-trip.component.html',
  styleUrls: ['./found-trip.component.css']
})
export class FoundTripComponent {
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
      departureAt: new FormControl(null, []),
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

  foundTrips(){
    const startRoute = this.form.controls['startRoute'].value;
    const endRoute = this.form.controls['endRoute'].value;
    const departureAt = this.form.controls['departureAt'].value;

    this.tripService.foundTripByStartAndEndPoints(startRoute, endRoute)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((currentTrips: TripModel[]) => {
        console.log('currentUser', currentTrips);
        this.trips = currentTrips;
        this.form.reset();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  joinTrip(trip: TripModel) {
    this.userService.joinToTrip(trip.id).subscribe(() => {
      console.log("success", 'cool')
    })
  }
}
