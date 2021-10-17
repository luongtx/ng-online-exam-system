import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Profile } from './profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile?: Profile;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCurrentProfile().subscribe(
      (data) => {
        this.profile = data
        // console.log(data);
      }
    )
  }

}
