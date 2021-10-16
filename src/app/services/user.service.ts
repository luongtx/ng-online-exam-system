import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppConstants } from "../constants/app.constants";
import { Profile } from "../profile/profile.model";

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private httpClient: HttpClient) { }

  getCurrentProfile(): Observable<Profile> {
    return this.httpClient.get<Profile>(AppConstants.API_END_POINT + "profile");
  }
}
