import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../constants/app.constants';
import { UserService } from '../services/user.service';
import { Profile } from './profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: Profile = {};
  profileCopy: Profile = {};
  serverErr?: string;
  editable: boolean = false;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCurrentProfile().subscribe(
      (data) => {
        this.profile = data;
        this.profileCopy = { ...data };
      }
    )
  }

  onSubmit() {
    this.userService.updateProfile(this.profile).subscribe(
      () => {
        this.editable = false
        this.userService.onProfileChanged()
        this.profileCopy = { ... this.profile }
      },
      (error) => {
        console.log(error)
        this.serverErr = error.error;
        this.resetProfile()
      }
    )
  }

  async onFileChanged(event: any) {
    let file = event.target.files[0];
    this.profile.imageSrc = await this.toBase64(file) as string;
  }

  toBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    })
  }

  async onUploadFile(fileInput: HTMLInputElement) {
    let file = fileInput.files?.item(0)
    if (!file || !file.type.startsWith("image")) {
      alert("Please choose an image");
      return;
    }
    this.userService.uploadProfileImage(file).subscribe(
      () => {
        alert("Upload image successfully!")
        this.userService.onProfileChanged()
      },
      (error) => {
        this.serverErr = error.error;
      }
    );
  }

  onCancelUpdate() {
    this.editable = false;
    this.resetProfile();
  }

  resetProfile() {
    this.profile = { ...this.profileCopy }
  }
}
