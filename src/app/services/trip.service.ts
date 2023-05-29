import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {TripModel} from "../../model/trip";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable()
export class TripService {
  private url: string = environment.apiUrl;
  constructor(private router: Router, private http: HttpClient) {

  }

  getTrips(): Observable<TripModel[]>{
    console.log("env", this.url);
    return this.http.get<TripModel[]>(`${this.url}/trips`);
  }
  getTripById(id: string):Observable<TripModel>{
    return this.http.get<TripModel>(`https://localhost:7208/trip/${id}`, {withCredentials: true});
  }
  createTrip(startRoute: string, endRoute: string, departureAt: Date): Observable<TripModel>{
    return this.http.post<TripModel>(`https://localhost:7208/Trip/create`, {startRoute, endRoute, departureAt},
      {withCredentials: true});
  }
  updateTripById(id: string, startRoute: string, endRoute: string, departureAt: Date): Observable<TripModel>{
    return this.http.put<TripModel>(`https://localhost:7208/trip/me/update`, {id, startRoute, endRoute, departureAt}, {withCredentials: true});
  }

  deleteTripById(id: string): Observable<any>{
    return this.http.delete<Observable<any>>(`https://localhost:7208/trip/me/delete/${id}`, {withCredentials: true} );
  }

  foundTripByStartAndEndPoints(startRoute: string, endRoute: string): Observable<TripModel[]>{
    return this.http.get<TripModel[]>(`${this.url}/trip/found_by_start_and_end_points/${startRoute}/${endRoute}`, {withCredentials: true});
  }
}
