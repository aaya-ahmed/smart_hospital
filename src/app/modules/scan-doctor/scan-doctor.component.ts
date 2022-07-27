import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { requestlist } from 'src/app/models/scan';
import { LogInAndOutService } from 'src/app/services/log-in-and-out.service';

@Component({
  selector: 'app-scan-doctor',
  templateUrl: './scan-doctor.component.html',
  styleUrls: ['../styles/mainstyle.css','./scan-doctor.component.css']
})
export class ScanDoctorComponent implements OnInit {
  request:requestlist=
  {
    id: 0,
    scanName: "",
    createdDtm: "",
    patientId: 0,
    doctorId: 0,
    patientName: " ",
    doctorName: "",
    scanId: 0,
    indoorPatientRecordId: 0
  };
  profileflag:boolean=true
  requestsflag:Boolean=false;
  showflag:Boolean=false;
  patientscanflag:Boolean=false;
  scanflag:Boolean=false;

  togglerequestsflag(){
    this.requestsflag=true;
    this.showflag=false;
    this.patientscanflag=false;
    this.scanflag=false;
    this.profileflag=false
  }
  togglescanflag(){
    this.requestsflag=false;
    this.showflag=false;
    this.patientscanflag=false;
    this.scanflag=true;
    this.profileflag=false
  }
  togglepatientscanflag(){
    this.requestsflag=false;
    this.showflag=false;
    this.patientscanflag=true;
    this.scanflag=false;
    this.profileflag=false
  }
  toggleshowflag(){
    this.requestsflag=false;
    this.showflag=true;
    this.patientscanflag=false;
    this.scanflag=false;
    this.profileflag=false
  }
  setprofileflag(){
    this.requestsflag=false;
    this.showflag=false;
    this.patientscanflag=false;
    this.scanflag=false;
    this.profileflag=true
  }
  constructor(private route:Router,private service:LogInAndOutService) { }

  ngOnInit(): void {
    if(localStorage.getItem("userRole")=="scan doctor"){
    }
    else{
      this.route.navigate(['../home'])
    }
  }
  logout(){
    this.service.logout();
    this.route.navigate(['/home'])
  }
  gotohome(){
    this.route.navigate(['/home'])
  }
  gotoaddscan(){
    this.route.navigate(['scan doctor/addscan'],{queryParams:this.request})
  }
}
