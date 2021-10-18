import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { AppConstants } from "../constants/app.constants";
import { Profile } from "../profile/profile.model";

@Injectable({ providedIn: 'root' })
export class UserService {
  profiledChanged: Subject<any> = new Subject();
  constructor(private httpClient: HttpClient) { }

  getCurrentProfile(): Observable<Profile> {
    return this.httpClient.get<Profile>(AppConstants.API_END_POINT + "profile");
  }

  updateProfile(profile: Profile): Observable<Profile> {
    return this.httpClient.put<Profile>(AppConstants.API_END_POINT + "profile/update", profile);
  }

  uploadProfileImage(file: File): Observable<any> {
    let fd = new FormData();
    fd.append('file', file);
    return this.httpClient.post(AppConstants.API_END_POINT + "profile/upload-image", fd);
  }

  onProfileChanged() {
    this.profiledChanged.next();
  }
}

