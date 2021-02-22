import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoggedIn:boolean = true;
  show:boolean = false;
  private authSubs: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authSubs = this.authService.isRegistered.subscribe(data => {
      this.show = data;
      this.isLoggedIn = data;
    });
  }

  showChange(){
    this.show = false;
  }

  switch(){
    this.isLoggedIn = !this.isLoggedIn;
  }

  onLogin(form:NgForm){
    // console.log(form);
    if(this.isLoggedIn){
      this.authService.isRegistered.next(false);
      this.authService.login(form.value.email, form.value.password);
    } else {
      this.authService.registerUser(form.value.email, form.value.password);
    }
  }

  ngOnDestroy(){
    this.authSubs.unsubscribe();
  }

}
