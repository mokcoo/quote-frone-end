import { Router } from '@angular/router';
import { UserService } from './../shared/user.service';
import { Component } from '@angular/core';
import { quoteData } from '../shared/user.model';
import { FormControl, Validators,NgForm,FormGroupDirective } from '@angular/forms';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  qd:quoteData = new quoteData; 
  selected:any;
  constructor(private user:UserService,private router:Router){}
  addTask(QT:any,DP:any,DD:any,PM:any){
    this.qd.QuoteType=QT;
    this.qd.Description=DP;
    this.qd.DueDate=DD;
    this.qd.Premium=PM;
    this.user.addTask(this.qd).subscribe();
    window.location.reload();
  }
  navigate(){
    this.router.navigate(['home']);
  }
  QuoteType = new FormControl('',[Validators.required]);
  Description = new FormControl('',[Validators.required]);
  DueDate = new FormControl('',[Validators.required]);
  Premium = new FormControl('',[Validators.required]);

}
