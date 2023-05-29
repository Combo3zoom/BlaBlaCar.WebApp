import {User} from "./user";

export interface TripModel {
  id: string,
  routeId: string,
  route: RouteModel,
  departureAt: string,
  tripCreatedAt: string,
  users: User[] | null
}

export interface RouteModel {
  id:string,
  startRoute:string,
  endRoute: string,
  trips: TripModel[] | null
}
