import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogInAndOutService } from 'src/app/services/log-in-and-out.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['../styles/mainstyle.css']
})
export class PatientComponent implements OnInit {
  appointmentflag=false;
  inpatientflag=false;
  profileflag=true
  prescriptionflag=false;
  testflag=false;
  scanflag=false;
  appointflag=false
  user:any
  constructor(private route:Router,private service:LogInAndOutService,private cookie:CookieService) { }


  ngOnInit(): void {
    if(localStorage.getItem("userRole")=="patient"){
    }
    else{
      this.route.navigate(['../home'])
    }
  }
  setprofileflag(){
    this.profileflag=true;
    this.appointmentflag=false;
    this.inpatientflag=false;
    this.prescriptionflag=false;
    this.testflag=false;
    this.appointflag=false
    this.scanflag=false;
  }
  setappointmentflag(){
    this.profileflag=false;
    this.appointmentflag=true;
    this.inpatientflag=false;
    this.prescriptionflag=false;
    this.testflag=false;
    this.appointflag=false
    this.scanflag=false;
  }
  setinpatientflag(){
    this.profileflag=false;
    this.appointmentflag=false;
    this.inpatientflag=true;
    this.prescriptionflag=false;
    this.testflag=false;
    this.appointflag=false
    this.scanflag=false;

  }
  setprescriptionflag(){
    
      this.profileflag=false;
      this.appointmentflag=false;
      this.inpatientflag=false;
      this.prescriptionflag=true;
      this.testflag=false;
      this.appointflag=false
      this.scanflag=false;

    
  }
  settestflag(){
    this.profileflag=false;
    this.appointmentflag=false;
    this.inpatientflag=false;
    this.prescriptionflag=false;
    this.testflag=true;
    this.appointflag=false
    this.scanflag=false;

  }
  setappointflag(){
    this.profileflag=false;
    this.appointmentflag=false;
    this.inpatientflag=false;
    this.prescriptionflag=true;
    this.testflag=false;
    this.appointflag=false
    this.scanflag=false;

  }
  setscanflag(){
    this.profileflag=false;
    this.appointmentflag=false;
    this.inpatientflag=false;
    this.prescriptionflag=false;
    this.testflag=false;
    this.appointflag=false
    this.scanflag=true;

  }
  logout(){
    this.service.logout();
    this.route.navigate(['/home'])
  }

}
