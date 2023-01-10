import { UserService } from './../shared/user.service';
import { User } from './../shared/user.model';
import { Component } from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  user: User = new User;
  constructor(private userService:UserService){
  }
  ngOnInit(){}
  resetForm(form?:NgForm){
    if(form!=null)
    form.reset();
    this.user={
      email:'',
      password:'',
      confirmpassword:''
    }
  }
  OnSubmit(id:any,pd:any,cpd:any){
    this.user.email=id;
    this.user.password=pd;
    this.user.confirmpassword=cpd;
    this.userService.registeruser(this.user).subscribe();
  }
  UserID = new FormControl('',[Validators.required]);
  Password = new FormControl('',[Validators.required]);
  ConfirmPassword = new FormControl('',[Validators.required]);
}
