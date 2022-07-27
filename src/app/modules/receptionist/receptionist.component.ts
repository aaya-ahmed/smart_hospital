import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogInAndOutService } from 'src/app/services/log-in-and-out.service';

@Component({
  selector: 'app-receptionist',
  templateUrl: './receptionist.component.html',
  styleUrls: ['../styles/mainstyle.css','./receptionist.component.css']
})
export class ReceptionistComponent implements OnInit {
  patientflag=false;
  appointmentflag=false;
  dashboardflag=true;
  shpatientappointmentflag=false
  billflag=false
  constructor(private route:Router,private service:LogInAndOutService) { }

  ngOnInit(): void {
    if(localStorage.getItem("userRole")=="receptionist"){
    }
    else{
      this.route.navigate(['../home'])
    }
  }
  togglepatientflag(){
    this.patientflag=!this.patientflag;
    this.appointmentflag=false
    this.dashboardflag=false
    this.shpatientappointmentflag=false
    this.billflag=false
  }
  toggleappointflag(){
    this.patientflag=false;
    this.appointmentflag=!this.appointmentflag
    this.dashboardflag=false
    this.shpatientappointmentflag=false
    this.billflag=false
  }
  toggledashboardflag(){
    this.patientflag=false;
    this.appointmentflag=false
    this.dashboardflag=!this.dashboardflag
    this.shpatientappointmentflag=false
    this.billflag=false
  }
  toggleshpatientappointflag(){
    this.patientflag=false;
    this.appointmentflag=false
    this.dashboardflag=false
    this.shpatientappointmentflag=!this.shpatientappointmentflag
    this.billflag=false
  }
  togglebillflag(){
    this.patientflag=false;
    this.appointmentflag=false
    this.dashboardflag=false
    this.shpatientappointmentflag=false
    this.billflag=!this.billflag
  }
  logout(){
    this.service.logout();
    this.route.navigate(['/home'])
  }
}
