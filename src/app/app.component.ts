import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'online-exam-system';
  isLoggedin = false;
  constructor(private route: ActivatedRoute, private router: Router, private loginService: LoginService) { }
  ngOnInit(): void {
    this.loginService.isLoggedin.subscribe(
      (data) => this.isLoggedin = data
    );
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
