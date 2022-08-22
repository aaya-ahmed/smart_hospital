import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { signupdata } from '../models/reg';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
 private registpatienturl:string="https://smarthospital20220729232305.azurewebsites.net/api/Patient";
 
  constructor(private http:HttpClient) { }
  addpatient(patient:signupdata){
   return this.http.post<any>(this.registpatienturl,patient);
  }
}
