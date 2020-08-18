import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/services/data-service/token.service';
import { AuthService } from 'src/services/api-service/auth-api.service';
import { User } from "src/models/user.model"
import { LocalStorageService } from 'src/services/data-service/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, 
    private tokenSvc: TokenService, 
    private authSvc: AuthService,
    private localSvc: LocalStorageService
    ) { }

  isLoggedIn: boolean;
  isFailed: boolean;

  ngOnInit(): void {
    if (this.tokenSvc.getLoginStatus()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(form){
    const user = form.form.controls.user.value;
    const pass = form.form.controls.pass.value;
    this.isFailed = true;
    if(user === "amigo" && pass === "delta"){
      this.isFailed = false;
      this.authSvc.login(user, pass)
      .subscribe((user: User[]) => {
        // on next
        user[0] = Object.assign(user[0], {isLoggedIn: true, password: null});
        this.tokenSvc.setUser(user[0]);
        this.localSvc.setUser(user[0]);
        this.router.navigate(['/dashboard']);
      }, error => {
        // on error
        console.log(error);
        this.router.navigate(['/login']);
      }, () => {
        // on complete
      });
    }
  }

}
