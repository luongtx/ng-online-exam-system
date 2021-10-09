import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'online-exam-system';
  constructor(private route: ActivatedRoute, private router: Router){}
  onClickExplore() {
    console.log("explore");

    this.router.navigate(['exams'],{relativeTo: this.route})
  }
}
