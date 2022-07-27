import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogInAndOutService } from 'src/app/services/log-in-and-out.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['../styles/mainstyle.css','./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  appointmentflag=false;
  inpatientflag=false;
  profileflag=true
  user:any
  constructor(private route:Router,private service:LogInAndOutService) { }

  ngOnInit(): void {
    if(localStorage.getItem("userRole")=="doctor"){
    }
    else{
      this.route.navigate(['../home'])
    }
    
  }

  setprofileflag(){
    this.profileflag=true;
    this.appointmentflag=false;
    this.inpatientflag=false;
  }
  setappointmentflag(){
    this.profileflag=false;
    this.appointmentflag=true;
    this.inpatientflag=false;
  }
  setinpatientflag(){
    this.profileflag=false;
    this.appointmentflag=false;
    this.inpatientflag=true;
  }
  logout(){
    this.service.logout();
    this.route.navigate(['/home'])
  }
}
