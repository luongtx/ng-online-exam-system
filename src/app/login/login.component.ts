import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { LoginRequest } from './login.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  errorMessage?: string;
  errorSubcription?: Subscription;
  constructor(private loginService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnDestroy(): void {
    this.errorSubcription?.unsubscribe();
  }

  ngOnInit(): void {
    this.errorSubcription = this.loginService.errorMessage.subscribe(
      (data) => {
        this.errorMessage = data;
        if (this.errorMessage.length == 0) {
          this.router.navigate(['..'], { relativeTo: this.route })
        }
      }
    )
  }

  login(usernameInput: HTMLInputElement, passwordInput: HTMLInputElement) {
    let user = new LoginRequest(usernameInput.value, passwordInput.value);
    this.loginService.login(user);
  }
}
