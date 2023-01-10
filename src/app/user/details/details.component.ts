import { mquoteData } from './../shared/user.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from './../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject} from '@angular/core';
import { HomeComponent } from '../home/home.component';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{
  quote:any;
  pd_id:any;
  data:any;
  quoteID:any;
  detailQuote:mquoteData = new mquoteData;
  constructor(@Inject(MAT_DIALOG_DATA) public datas, private router:Router,private userService:UserService,private activeRoute:ActivatedRoute){
    this.quoteID = datas.quoteID;
  }
  ngOnInit(){
    this.activeRoute.params.subscribe({
      next:(qq)=>{
        this.pd_id = qq['id']
      }
    });
      this.userService.findData(this.quoteID).subscribe((dd:any)=>{
        this.quote = dd;
        this.detailQuote = this.quote;
        console.log(this.quote);
      });
  }
  navigate(){
    this.router.navigate(['home']);
  }
}
