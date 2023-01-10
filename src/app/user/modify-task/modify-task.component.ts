import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../shared/user.service';
import { quoteData, mquoteData } from './../shared/user.model';
import { Component, OnInit,Inject } from '@angular/core';

@Component({
  selector: 'app-modify-task',
  templateUrl: './modify-task.component.html',
  styleUrls: ['./modify-task.component.css']
})
export class ModifyTaskComponent implements OnInit{
  qd:mquoteData = new mquoteData; 
  valueQuote:mquoteData = new mquoteData;
  pd_id:any;
  quote:any;
  quoteID:any;
  constructor(@Inject(MAT_DIALOG_DATA) public datas,private user:UserService,private router:Router,private activeRoute:ActivatedRoute){
    this.quoteID = datas.quoteID;
  }
  ngOnInit(): void {
    this.activeRoute.params.subscribe({
      next:(qq)=>{
        this.pd_id = qq['id1']
        
      }
    });
      this.user.findData(this.quoteID).subscribe((dd:any)=>{
        this.quote = dd;
        this.valueQuote = this.quote;
        localStorage.setItem('m_pd_id',this.quote.QuoteID);
        this.qd.QuoteID = this.quote.QuoteID;
        this.QuoteType.setValue(this.quote.QuoteType);
        this.Description.setValue(this.quote.Description);
        this.DueDate.setValue(this.quote.DueDate);
        this.Premium.setValue(this.quote.Premium);

        console.log(this.quote);
      });
      
  }
  modifyTask(QT:any,DP:any,DD:any,PM:any){
    this.qd.QuoteType=QT;
    this.qd.Description=DP;
    this.qd.DueDate=DD;
    this.qd.Premium=PM;
    console.log(this.qd);
    this.user.modifyTask(this.qd).subscribe();
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
