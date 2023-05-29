import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl,Validators,FormGroupDirective} from '@angular/forms';
import { AuthService } from '../../services/auth.service'
import {Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {User} from "../../../model/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  fieldRequired: string = "This field is required";
  private readonly unsubscribe$ = new Subject<void>();
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.createForm();
  }
  createForm(){
    this.registerForm = new FormGroup(
      {'name': new FormControl(null,[Validators.required]),
        'password': new FormControl(null, [Validators.required, this.checkPassword]),
      }
    )
  }
  checkPassword(control:any) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }
  getErrorPassword() {
    return this.registerForm?.get('password')?.hasError('required') ? 'This field is required (The password must be at least six characters, one uppercase letter and one number)' :
      this.registerForm?.get('password')?.hasError('requirements') ? 'Password needs to be at least six characters, one uppercase letter and one number' : '';
  }
  checkValidation(input: string){
    const validation: boolean | undefined  = this.registerForm?.get(input)?.invalid && (this.registerForm?.get(input)?.dirty ||
      this.registerForm?.get(input)?.touched)
    return validation;
  }
  onSubmit(formData: FormGroup, formDirective: FormGroupDirective): void {
    this.auth.registerUser(this.registerForm.value).pipe(takeUntil(this.unsubscribe$))
      .subscribe((currentUser: User)=>{
      console.log('currentUser', currentUser)
      this.router.navigate(['login']);
    })
    formDirective.resetForm();
    this.registerForm.reset();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
