import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

import { AuthService } from "../auth.service";
import { UserLoggedData } from "../user.mode";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ['./edit-profile.component.css']
})

export class EditProfile implements OnInit, OnDestroy {
  private imgPath: File;
  private id: number;
  private authSubs: Subscription;
  userData: UserLoggedData;

  constructor(private authService: AuthService) {}

  ngOnInit(){
    this.authSubs = this.authService.isLogged.subscribe(data => {
      this.userData = data.user;
    });
  }

  onUpload(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    // reader.onload = () => {
    //   this.imgPathAsString = reader.result as string;
    // };
    reader.readAsDataURL(file);
    this.imgPath = file;
  }

  onUpdate(form:NgForm){
    this.authService.updateProfile(form.value.name, form.value.mobile, this.imgPath, this.userData.id);
  }

  ngOnDestroy(){
    this.authSubs.unsubscribe();
  }
}
