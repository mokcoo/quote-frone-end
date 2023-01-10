import { ActivatedRoute } from '@angular/router';
import { User, quoteData } from './user.model';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  rootUrl:string = "https://localhost:44355";
  constructor(private http:HttpClient) { }
  quote_id:any;
  registeruser(user:User):Observable<any>{
    
    const headers = {'content-type':'application/json'};
    const bodys = JSON.stringify(user);
    console.log(bodys);
    return this.http.post(this.rootUrl+'/api/account/register',bodys,{headers:headers});
  }
  
  userAuthentication(email:any,password:any){
    var data = "username="+email+"&password="+password+"&grant_type=password";
    const headers = {'content-type':'application/json'};
    return this.http.post(this.rootUrl+'/token',data,{headers:headers});
  }
  

  getInfo(){
    const headers = {'Authorization':'bearer '+localStorage.getItem('userToken')};
    return this.http.get(this.rootUrl+'/api/quotes',{headers:headers});
  }


  findData(id:any){
    const headers = {'Authorization':'bearer '+localStorage.getItem('userToken')};
    return this.http.get(this.rootUrl+'/api/quotes/'+id,{headers:headers});
  }


  deleteData(id:any){
    const headers = {'Authorization':'bearer '+localStorage.getItem('userToken')};
    return this.http.delete(this.rootUrl+'/api/quotes/'+id,{headers:headers});
  }


  addTask(qd:quoteData){
    const headers = {'Authorization':'bearer '+localStorage.getItem('userToken')};
    return this.http.post(this.rootUrl+'/api/quotes/',qd,{headers:headers});
  }


  modifyTask(qd:quoteData){
    const headers = {'Authorization':'bearer '+localStorage.getItem('userToken')};
    return this.http.put(this.rootUrl+'/api/quotes/'+localStorage.getItem('m_pd_id'),qd,{headers:headers});
  }
}
