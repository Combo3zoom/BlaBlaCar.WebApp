import { Component } from '@angular/core';
import {User} from "../../model/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TripModel} from "../../model/trip";
import {Subject, takeUntil} from "rxjs";
import {TripService} from "../services/trip.service";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  users: User[] = [];
  findTripForm!: FormGroup;
  shareTripForm!: FormGroup;
  trips: TripModel[] = []; // Define and initialize the trips array
  private readonly unsubscribe$ = new Subject<void>();

  constructor(private tripService: TripService, private userService: UserService) {}

  ngOnInit() {
    this.createFindTripForm();
    this.createShareTripForm();
    this.getUsers();
  }

  isUserVerified(user: User): boolean {
    return user.isVerification;
  }
  private createFindTripForm() {
    this.findTripForm = new FormGroup({
      findStartRoute: new FormControl(null, [Validators.required]),
      findEndRoute: new FormControl(null, [Validators.required]),
      findDepartureAt: new FormControl(null, []),
    });
  }

  private createShareTripForm() {
    this.shareTripForm = new FormGroup({
      shareStartRoute: new FormControl(null, [Validators.required]),
      shareEndRoute: new FormControl(null, [Validators.required]),
      shareDepartureAt: new FormControl(null, [Validators.required]),
    });
  }

  private getUsers() {
    this.userService.getUsers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((currentUsers: User[])=> {
        this.users = currentUsers;
      });
  }

  shareTrip() {
    const startRoute = this.shareTripForm.controls['shareStartRoute'].value;
    const endRoute = this.shareTripForm.controls['shareEndRoute'].value;
    const departureAt = this.shareTripForm.controls['shareDepartureAt'].value;

    this.tripService.createTrip(startRoute, endRoute, departureAt)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((currentTrip: TripModel) => {
        console.log('currentUser', currentTrip);
        this.shareTripForm.reset();
      });
  }

  foundTrips(){
    const startRoute = this.findTripForm.controls['findStartRoute'].value;
    const endRoute = this.findTripForm.controls['findEndRoute'].value;
    const departureAt = this.findTripForm.controls['findDepartureAt'].value;

    this.tripService.foundTripByStartAndEndPoints(startRoute, endRoute)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((currentTrips: TripModel[]) => {
        console.log('currentUser', currentTrips);
        this.trips = currentTrips;
        this.findTripForm.reset();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  joinTrip(trip: TripModel) {
    this.userService.joinToTrip(trip.id).subscribe(()=>{
      console.log("success", 'cool')
    })
  }
}
