import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { logindata } from '../models/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogInAndOutService {
  user:any;
  private logoutstate:boolean=true
  private baseurl:string="http://smarthospital.somee.com/api/Authentication/login";
  private usertoken:any
  constructor(private http:HttpClient) { }
  auth_user(user:logindata){
    return this.http.post(this.baseurl,user);
    }
  getinfo(role:string,id:number):Observable<any> {
    this.usertoken=localStorage.getItem("userToken")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.usertoken}`);
    if(role.toLowerCase ()=="doctor"){
      this.user= this.http.get("http://smarthospital.somee.com/api/Doctor/"+id,{ headers: headers })
      }
    else if(role.toLowerCase ()=="nurse"){
      this.user= this.http.get("http://smarthospital.somee.com/api/Nurse/"+id,{ headers: headers });
      }
    else if(role.toLowerCase ()=="admin"){
      this.user= this.http.get("http://smarthospital.somee.com/api/Admin/admin/"+id,{ headers: headers });
      }
    else if(role.toLowerCase ()=="receptionist"){
      this.user= this.http.get("http://smarthospital.somee.com/api/Admin/receptionist/"+id,{ headers: headers });
      }
    else if(role.toLowerCase ()=="patient"){
      this.user= this.http.get("http://smarthospital.somee.com/api/Patient/"+id,{ headers: headers });
    }
      this.logoutstate=false
      return this.user
  }
  logout(){
    localStorage.removeItem("userInfo")
    localStorage.removeItem("userRole")
    localStorage.removeItem("userToken")
    localStorage.removeItem("login")
  }
  set outstate(state:boolean){
    this.logoutstate=state
  }
  get outstate(){
    return this.logoutstate
  }
}
