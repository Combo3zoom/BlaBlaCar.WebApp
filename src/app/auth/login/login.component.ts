import { Component } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {LoginResponce} from "../../../model/LoginResponce";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  private readonly unsubscribe$ = new Subject<void>();
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.createForm();
  }
  createForm(){
    this.loginForm = new FormGroup({
      'name': new FormControl(null),
      'password': new FormControl(null)
    })
  }
  onSubmit( formData: FormGroup, loginDirective: FormGroupDirective){
    this.authService.loginUser(this.loginForm.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((responce:LoginResponce)=>{
        this.authService.isAuth = true;
        localStorage.setItem('userRole', responce.role);
        debugger
        this.router.navigate(['home']);
      });
  }

}
