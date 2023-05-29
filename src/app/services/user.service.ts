import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {User} from "../../model/user";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable()
export class UserService {
  url: string = environment.apiUrl;
  constructor(private router: Router, private http: HttpClient) {

  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.url}/Users`);
  }

  getMe(): Observable<User>{
    return this.http.get<User>(`${this.url}/me`);
  }

  joinToTrip(tripId: string):Observable<any>{
    return this.http.post<any>(`${this.url}/joinToTrip`, {tripId});
  }

  adminDeleteUser(userId: string){
    return this.http.delete(`${this.url}/admin/${userId}`);
  }

  updateUserVerification(id: string, isVerificated: boolean){
    return this.http.put(`${this.url}/admin/user_verification`, {id, isVerificated});
  }
}

