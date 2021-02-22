import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User, UserLoggedData } from "./user.mode";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Injectable({
providedIn: "root"
})
export class AuthService {

  private userLoggedData: UserLoggedData = {
    id: null,
    name: null,
    mobile: null,
    email: null
  }

  constructor( private http: HttpClient, private router: Router) {}

  isLogged = new BehaviorSubject
    <{loggedIn: boolean, user: UserLoggedData}>
    ({loggedIn: false, user: this.userLoggedData});

  isRegistered = new BehaviorSubject<boolean>(false);

  registerUser(email: string, password: string){
    const userData: User = {
      email: email,
      password: password
    }
    this.http.post("http://localhost:3000/register", userData)
      .subscribe(response => {
        this.isRegistered.next(true);
        this.router.navigate(['']);
      }, (err) => {
        let errorMsg = "Something went Wrong";
        switch (err.status) {
          case 409:
            errorMsg = 'Email Already Exits';
            break;
          default:
            errorMsg;
            break;
        }
        alert(errorMsg);
      });
  }

  login(email: string, password: string){
    const userCredientials: User = {
      email: email,
      password: password
    };
    this.http.post<{message: string, user:UserLoggedData}>("http://localhost:3000/login", userCredientials)
      .subscribe(response => {
        this.userLoggedData = response.user;
        this.isLogged.next({loggedIn: true, user:this.userLoggedData});
        this.router.navigate(['/home']);
      }, (err) => {
        // console.log(err);
        let errorMsg = "Something went Wrong";
        switch (err.error.message) {
          case 'EMAIL_NOT_FOUND':
            errorMsg = 'Email Not Registered';
            break;
          case 'PASSWORD_INVALID':
            errorMsg = 'Email or Password is Invalid';
            break;
          default:
            errorMsg;
            break;
        }
        alert(errorMsg);
      });
  }

  logout(){
    this.isLogged.next({loggedIn: false, user: this.userLoggedData});
    this.router.navigate(['']);
  }

  updateProfile(name: string, mobile:number, img:File, id: number){
    const newdata = new FormData();
    newdata.append("name", name);
    newdata.append("mobile", mobile.toString());
    newdata.append("img", img, id.toString());
    newdata.append("id", id.toString());
    console.log(img);
    this.http.put<{message: string}>("http://localhost:3000/update", newdata).subscribe(result => {
      alert(result.message);
      this.router.navigate(['/home']);
    }, (err) => {
      let errorMsg = "Something went Wrong";
      console.log(err);
      switch (err.status) {
        case 409:
          errorMsg = err.error.message;
          break;
        case 401:
          errorMsg = err.error.message;
          break;
        case 400:
          errorMsg = err.error.message;
          break;
        default:
          errorMsg;
          break;
      }
      alert(errorMsg);
    });
  }
}
