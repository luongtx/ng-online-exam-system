import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { Profile } from './profile/profile.model';
import { UserService } from './auth/user.service';

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
  profileChangedSubcription?: Subscription;
  isAdmin = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: AuthService,
    private userService: UserService
  ) { }

  ngOnDestroy(): void {
    this.loggedInSubcription?.unsubscribe()
    this.profileChangedSubcription?.unsubscribe()
  }

  ngOnInit(): void {
    this.loggedInSubcription = this.loginService.isLoggedin.subscribe(
      (value) => {
        this.isLoggedin = value
        this.isAdmin = this.loginService.checkAdminRole();
        if (this.isLoggedin) {
          this.userService.getCurrentProfile().subscribe(
            (data) => this.profile = data,
            (error) => {
              console.log(error);
              this.loginService.logout()
            }
          )
        }
        if(this.isAdmin){
          this.router.navigate(['manage-exams'], {relativeTo: this.route})
        } else {
          this.router.navigate(['exams'], {relativeTo: this.route})
        }
      }
    )
    this.profileChangedSubcription = this.userService.profiledChanged.subscribe(
      () => {
        this.userService.getCurrentProfile().subscribe(
          (data) => this.profile = data
        )
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
