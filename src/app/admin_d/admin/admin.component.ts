import { Component } from '@angular/core';
import {User} from "../../../model/user";
import {Subject, takeUntil} from "rxjs";
import {TripService} from "../../services/trip.service";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  users: User[] = [];
  unverifitedUsers: User[] = [];
  private readonly unsubscribe$ = new Subject<void>();

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    const isAdmin = localStorage.getItem('userRole') === 'Admin';

    if (isAdmin) {
      this.getUsers();
    } else {
      this.router.navigate(['/home']);
    }
  }

  private getUsers() {
    this.userService.getUsers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((currentUsers: User[])=> {
        this.users = currentUsers;
        this.unverifitedUsers = currentUsers;
      });
  }
  isUserVerified(user: User): boolean {
    return user.isVerification;
  }

  submitUser(user: User) {
    this.userService.updateUserVerification(user.id, true)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
  }
  rejectUser(user: User) {
    this.userService.updateUserVerification(user.id, false)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
