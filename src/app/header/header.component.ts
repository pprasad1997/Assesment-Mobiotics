import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  title: string = "Assesment";
  isLogged = false;
  authSubs: Subscription;
  id: number;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authSubs = this.authService.isLogged.subscribe(status => {
      this.isLogged = status.loggedIn;
    });
  }

  logout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.authSubs.unsubscribe();
  }

}
