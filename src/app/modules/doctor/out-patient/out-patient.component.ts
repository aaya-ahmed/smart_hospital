import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { patientrequest } from 'src/app/models/patient';

@Component({
  selector: 'app-out-patient',
  templateUrl: './out-patient.component.html',
  styleUrls: ['./out-patient.component.css']
})
export class OutPatientComponent implements OnInit {
  reportsflag=false;
  labflag=false;
  scanflag=false;
  outpatientflag:number=1
  precflag=false
  showprecflag=false;
  reqscanflag=false
  reqlabflag=false
  patient:patientrequest={
    patientName:"",
    slotTime:"",
    patientId: 0,
    age: 0,
    gender:"",
    complain:"",
    examined: false,
    indoorPatientRecordId:0
}
  constructor(private router:ActivatedRoute) { }

  ngOnInit(): void {   
    this.router.queryParams.subscribe(  
      (params:any)=>{
       this.patient=params
      }
    )
  }
  setreportsflag(){
  this.reportsflag=!this.reportsflag;
  this.labflag=false;
  this.scanflag=false;
  this.precflag=false
  this.showprecflag=false
  this.reqscanflag=false
  this.reqlabflag=false
  }
  setlabflag(){
  this.reportsflag=false;
  this.labflag=!this.labflag;
  this.scanflag=false;
  this.precflag=false;
  this.showprecflag=false;
  this.reqscanflag=false
  this.reqlabflag=false
  }
  setscanflag(){
    this.reportsflag=false;
  this.labflag=false;
  this.scanflag=!this.scanflag;
  this.precflag=false;
  this.showprecflag=false
  this.reqscanflag=false
  this.reqlabflag=false
  }
  setprecflag(){
  this.reportsflag=false;
  this.labflag=false;
  this.scanflag=false;
  this.precflag=!this.precflag;
  this.showprecflag=false;
  this.reqscanflag=false
  this.reqlabflag=false
  }
  setshowprecflag(){
    this.reportsflag=false;
    this.labflag=false;
    this.scanflag=false;
    this.precflag=false;
    this.showprecflag=!this.showprecflag;
    this.reqscanflag=false
  this.reqlabflag=false
  }
  setreqscanflag(){
    this.reportsflag=false;
    this.labflag=false;
    this.scanflag=false;
    this.precflag=false;
    this.showprecflag=false;
    this.reqscanflag=!this.reqscanflag
    this.reqlabflag=false
  }
  setreqlabflag(){
    this.reportsflag=false;
    this.labflag=false;
    this.scanflag=false;
    this.precflag=false;
    this.showprecflag=false;
    this.reqscanflag=false
    this.reqlabflag=!this.reqlabflag
  }
}
