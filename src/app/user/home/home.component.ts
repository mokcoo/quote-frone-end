import { ModifyTaskComponent } from './../modify-task/modify-task.component';
import { DetailsComponent } from './../details/details.component';
import { Test1Component } from './../../test1/test1.component';
import { AddTaskComponent } from './../add-task/add-task.component';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort'
import { MatIconModule } from '@angular/material/icon';
import {MatTableDataSource} from '@angular/material/table';
import { UserService } from './../shared/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component,ViewChild,Inject } from '@angular/core';
import { MatTable } from '@angular/material/table';
import {Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit{
  info:any;
  product_id:number = 101;
  data:any;
  loop_time:any = 5;
  constructor(private dialogRef:MatDialog, private router:Router,private userService:UserService,private activeRoute:ActivatedRoute,private _liveAnnouncer: LiveAnnouncer){
  }
  openDialog(){
    this.dialogRef.open(AddTaskComponent,{
      height:'400px',
      width:'400px',
    });
  }
  openDetails(id:any){
    this.dialogRef.open(DetailsComponent,{
      height:'700px',
      width:'700px',
      data:{
        quoteID:id
      }
    });
  }
  openModify(id:any){
    this.dialogRef.open(ModifyTaskComponent,{
      height:'400px',
      width:'400px',
      data:{
        quoteID:id
      }
    });
  }
  dataSource:MatTableDataSource<any>;
  displayedColumns: string[] = ['QuoteID', 'QuoteType', 'Description', 'DueDate','Premium','detail','modify','delete'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit(){
    this.userService.getInfo().subscribe((data:any)=>{
      this.info = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.info);
    })
    this.activeRoute.params.subscribe({
      next:(qq)=>{
        this.product_id = qq['id']
      }
    });
    
  }

  
  ngAfterViewInit() {
    
  }
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  logout(){
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }
  findData(id:any){
    this.userService.findData(id).subscribe((dd:any)=>{
      this.data = dd;
      console.log(this.data);
    });
  }
  navigate(id:any){
    this.router.navigate(['details',id]);
  }
  delete(id:any){
    var answer = window.confirm("You want to delete this data?");
    if(answer){
    this.userService.deleteData(id).subscribe();
    window.location.reload();
    }
  }
  navigateAdd(){
    this.router.navigate(['addTask']);
  }
  navigateMod(id:any){
    this.router.navigate(['modify',id]);
  }
////////////////////////////////////


}
