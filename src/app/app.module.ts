import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { EditProfile } from "./edit-profile/edit-profile.component";
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from "./auth-guard.service";

const routes: Routes = [

  { path: "", component: LoginComponent },
  { path: "edit", component: EditProfile },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "editProfile", component: EditProfile, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    EditProfile,
    LoginComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
