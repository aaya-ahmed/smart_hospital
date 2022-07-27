import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { signupdata } from '../models/reg';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
 private registpatienturl:string="http://192.168.1.36:5200/api/Patient";
 //private registpatienturl:string="http://192.168.181.252:5050/api/";

 //private registpatienturl:string="https://localhost:7163/api/Patient";
  constructor(private http:HttpClient) { }
  addpatient(patient:signupdata){
   return this.http.post<any>(this.registpatienturl,patient);
  }
}
