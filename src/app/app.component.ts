import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Profile } from './profile/profile.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'online-exam-system';
  isLoggedin = false;
  loggedInSubcription?: Subscription;
  profile?: Profile;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: AuthService
  ) { }

  ngOnDestroy(): void {
    this.loggedInSubcription?.unsubscribe()
  }

  ngOnInit(): void {
    this.loggedInSubcription = this.loginService.isLoggedin.subscribe(
      (value) => {
        this.isLoggedin = value
        if (this.isLoggedin) {
          // this.profileService.getCurrentProfile().subscribe(
          //   (data) => this.profile = data
          // )
        }
      }
    )
  }

  onClickExplore() {
    console.log("explore");
    this.router.navigate(['exams'], { relativeTo: this.route })
  }

  onClickLogout() {
    if (confirm("Are you sure to logout?")) {
      this.loginService.logout();
      this.router.navigate(['../login'], { relativeTo: this.route })
    }
  }
}
