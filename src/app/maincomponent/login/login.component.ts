import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { logindata } from 'src/app/models/login';
import { LogInAndOutService } from 'src/app/services/log-in-and-out.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  togglestatus:boolean=false;
  image:any
  loginflag:boolean=false
  errorflag:boolean=false
  constructor(private route:Router,private service:LogInAndOutService) { }
  ngOnInit(): void {
    //when user is login mustn't show login page
    let isLoggedIn=this.service.outstate;
    if(!isLoggedIn){
      this.route.navigate(['/'+localStorage.getItem("userRole")])
    }
  }
  //validation requirement for loginform
  login:FormGroup=new FormGroup({
    UserName:new FormControl('',[Validators.required]),
    Password:new FormControl('',[Validators.required])
  });
  //make variabe for error message when don't found user
  errormes:string='';
  //to get control list for each element in form
  get UserNamev(){
    return this.login.controls['UserName']
  }
  get Passwordv(){
    return this.login.controls['Password']
  }

  //validate user data
  submit(){
    if(this.login.valid){
      this.loginflag=true
      this.service.auth_user(this.login.value).subscribe(
        (res:any)=>{
         if(res.status=='successful'){
          localStorage.setItem("userToken",res.token);
          const helper = new JwtHelperService();
          const decodedToken = helper.decodeToken(res.token);
          let id= decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
          let role=res.role.toLowerCase()
          this.service.getinfo(role,id).subscribe(
          (res:any)=>{
            if(role.toLowerCase ()=="doctor"&&res.departmentName=="Scan"){
              role="scan doctor"
            }
            else if(role.toLowerCase ()=="doctor"&&res.departmentName=="Labs"){
              role="lab doctor"
            }
            localStorage.setItem("userInfo",JSON.stringify(res));
            localStorage.setItem("userRole",role.toLowerCase());
            localStorage.setItem("login","true")
            this.route.navigate(['/'+role.toLowerCase ()])
          }
        );
          }
          else{
          this.loginflag=false
          this.errormes=res.status;
          this.errorflag=true
          let i=setTimeout(() => {
            this.errorflag=false;
            clearTimeout(i)
          }, 1000);
       }
        },
       (err:any)=>{
          this.loginflag=false
          this.errormes="error";
          this.errorflag=true
          let i=setTimeout(() => {
            this.errorflag=false;
            clearTimeout(i)
          }, 1000);
        }
        );
      }
  }


}
