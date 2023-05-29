import {Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {register_user_dto} from "../../model/register_user_dto";
import {User} from "../../model/user";
import {LoginResponce} from "../../model/LoginResponce";

@Injectable()
export class AuthService {
  public isAuth: boolean = false;

  constructor(private router: Router, private http: HttpClient) {
  }

  registerUser(request: register_user_dto): Observable<User> {
    return this.http.post<User>('https://localhost:7208/api/Auth/register', request, { withCredentials: true });
  }
  loginUser(request: register_user_dto): Observable<LoginResponce> {
    return this.http.post<LoginResponce>('https://localhost:7208/api/Auth/login', request, { withCredentials: true });
  }

}
