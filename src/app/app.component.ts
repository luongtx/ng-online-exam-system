import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'online-exam-system';
  isLoggedin = false;
  loggedInSubcription?: Subscription;
  constructor(private route: ActivatedRoute, private router: Router, private loginService: LoginService) { }

  ngOnDestroy(): void {
    this.loggedInSubcription?.unsubscribe()
  }

  ngOnInit(): void {
    this.loggedInSubcription = this.loginService.isLoggedin.subscribe(
      (value) => {
        this.isLoggedin = value
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
    }
  }
}
