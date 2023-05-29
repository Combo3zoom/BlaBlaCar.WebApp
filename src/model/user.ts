import {TripModel} from "./trip";

export interface User {
  id: string,
  name: string,
  role: number,
  isVerification: boolean,
  userCreatedAt: Date,
  refreshToken: string,
  userTrips: TripModel[] | null
}
