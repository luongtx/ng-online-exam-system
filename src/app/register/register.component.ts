import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  serverErr?: string;
  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log("submitted");
    this.authService.register(this.form).subscribe(
      () => {
        alert("Register successfully!");
        this.router.navigate(['..', 'login'], { relativeTo: this.route })
      },
      (error: HttpErrorResponse) => {
        this.serverErr = error.error
      }
    )
  }

}
