import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAllLabRequsts } from 'src/app/models/lab';
import { LogInAndOutService } from 'src/app/services/log-in-and-out.service';

@Component({
  selector: 'app-medical-analysit',
  templateUrl: './medical-analysit.component.html',
  styleUrls: ['../styles/mainstyle.css','./medical-analysit.component.css']
})
export class MedicalAnalysitComponent implements OnInit {

  request: getAllLabRequsts={
    id:0,
    labName: '',
    testId: 0,
    createdDtm: '',
    patientId: 0,
    doctorId: 0,
    patientName: '',
    doctorName: '',
    indoorPatientRecordId:0
  };
  profileflag:boolean=true
  requestsflag:Boolean=false;
  showflag:Boolean=false;
  patientlabflag:Boolean=false;
  labflag:Boolean=false;
  constructor(private route:Router,private service:LogInAndOutService) { }

  ngOnInit(): void {
    if(localStorage.getItem("userRole")=="lab doctor"){
    }
    else{
      this.route.navigate(['../home'])
    }
  }
  togglerequestsflag(){
    this.requestsflag=true;
    this.showflag=false;
    this.patientlabflag=false;
    this.labflag=false;
    this.profileflag=false
  }
  togglelabflag(){
    this.requestsflag=false;
    this.showflag=false;
    this.patientlabflag=false;
    this.labflag=true;
    this.profileflag=false
  }
  togglepatientlabflag(){
    this.requestsflag=false;
    this.showflag=false;
    this.patientlabflag=true;
    this.labflag=false;
    this.profileflag=false
  }
  toggleshowflag(){
    this.requestsflag=false;
    this.showflag=true;
    this.patientlabflag=false;
    this.labflag=false;
    this.profileflag=false
  }
  setprofileflag(){
    this.requestsflag=false;
    this.showflag=false;
    this.patientlabflag=false;
    this.labflag=false;
    this.profileflag=true
  }
  logout(){
    this.service.logout();
    this.route.navigate(['/home'])
  }
  gotohome(){
    this.route.navigate(['/home'])
  }
  gotoaddlab(){
    this.route.navigate(['lab doctor/addtest'],{queryParams:this.request})
  }
}
