import { FormControl, Validators } from '@angular/forms';
import { UserService } from './../shared/user.service';
import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  isLoginError:boolean=false;
  constructor(private userService:UserService,private router:Router){}
  ngOnInit(){

  }
  OnSubmit(email:any,password:any){
    this.userService.userAuthentication(email,password).subscribe((data:any)=>{
      localStorage.setItem('userToken',data.access_token);
      this.router.navigate(['/home']);
    },(err:HttpErrorResponse)=>{
      this.isLoginError = true;
    });
  }
  UserName = new FormControl('',[Validators.required]);
  Password = new FormControl('',[Validators.required]);
}
