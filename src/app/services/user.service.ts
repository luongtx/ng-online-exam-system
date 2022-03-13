import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Profile } from "../models/profile.model";

@Injectable({ providedIn: 'root' })
export class UserService {
  profiledChanged: Subject<any> = new Subject();
  constructor(private httpClient: HttpClient) { }

  getCurrentProfile(): Observable<Profile> {
    return this.httpClient.get<Profile>(environment.apiUrl + "profile");
  }

  updateProfile(profile: Profile): Observable<Profile> {
    return this.httpClient.put<Profile>(environment.apiUrl + "profile/update", profile);
  }

  uploadProfileImage(file: File): Observable<any> {
    let fd = new FormData();
    fd.append('file', file);
    return this.httpClient.post(environment.apiUrl + "profile/upload-image", fd);
  }

  onProfileChanged() {
    this.profiledChanged.next();
  }
}

