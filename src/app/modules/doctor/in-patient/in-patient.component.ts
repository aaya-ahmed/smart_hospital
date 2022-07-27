import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { inpatient } from 'src/app/models/patient';

@Component({
  selector: 'app-in-patient',
  templateUrl: './in-patient.component.html',
  styleUrls: ['./in-patient.component.css']
})
export class InPatientComponent implements OnInit {
  patient:inpatient={
    patientName: '',
    patientId: 0,
    indoorPatientRecordId: 0,
    age: 0,
    gender: '',
    causeOfAdmission: '',
    oralMedicalHistory: '',
    enterDate: '',
    room_Number: 0,
    bedNumber: 0,
    floor_Number: 0
  }
  outpatientflag:number=0
  showoldIndoorrecordsflag:boolean=false;
  scanflag:boolean=false;
  labflag:boolean=false;
  dischargeflag:boolean=false;
  vitalflag:boolean=false;
  reqscanflag:boolean=false
  reqlabflag:boolean=false
  showprecflag:boolean=false
  precflag:boolean=false
  constructor(private router:ActivatedRoute) { }
  ngOnInit(): void {
    this.router.queryParams.subscribe(
      (param:any)=>{
        this.patient=param
      }
    )
  }
  setoldIndoorrecordsflag(){
  this.showoldIndoorrecordsflag=!this.showoldIndoorrecordsflag;
  this.scanflag=false;
  this.labflag=false;
  this.dischargeflag=false;
  this.vitalflag=false;
  this.reqscanflag=false
  this.reqlabflag=false
  this.showprecflag=false
  this.precflag=false
  }
  setlabflag(){
    this.showoldIndoorrecordsflag=false;
    this.scanflag=false;
    this.labflag=!this.labflag;
    this.dischargeflag=false;
    this.vitalflag=false;
    this.reqscanflag=false
    this.reqlabflag=false
    this.showprecflag=false
    this.precflag=false
  }
  setscanflag(){
    this.showoldIndoorrecordsflag=false;
    this.scanflag=!this.scanflag;
    this.labflag=false;
    this.dischargeflag=false;
    this.vitalflag=false;
    this.reqscanflag=false
    this.reqlabflag=false
    this.showprecflag=false
    this.precflag=false
  }
  setdischargeflag(){
    this.showoldIndoorrecordsflag=false;
    this.scanflag=false;
    this.labflag=false;
    this.dischargeflag=!this.dischargeflag;
    this.vitalflag=false;
    this.reqscanflag=false
    this.reqlabflag=false
    this.showprecflag=false
    this.precflag=false
}
setvitalflag(){
  this.showoldIndoorrecordsflag=false;
  this.scanflag=false;
  this.labflag=false;
  this.dischargeflag=false;
  this.vitalflag=!this.vitalflag;
  this.reqscanflag=false
  this.reqlabflag=false
  this.showprecflag=false
  this.precflag=false
}
setreqscanflag(){
  this.showoldIndoorrecordsflag=false;
  this.scanflag=false;
  this.labflag=false;
  this.dischargeflag=false;
  this.vitalflag=false;
  this.reqscanflag=!this.reqscanflag
  this.reqlabflag=false
  this.showprecflag=false
  this.precflag=false
}
setreqlabflag(){
  this.showoldIndoorrecordsflag=false;
  this.scanflag=false;
  this.labflag=false;
  this.dischargeflag=false;
  this.vitalflag=false;
  this.reqscanflag=false
  this.reqlabflag=!this.reqlabflag
  this.showprecflag=false
  this.precflag=false
}
setshowprecflag(){
  this.showoldIndoorrecordsflag=false;
  this.scanflag=false;
  this.labflag=false;
  this.dischargeflag=false;
  this.vitalflag=false;
  this.reqscanflag=false
  this.reqlabflag=false
  this.showprecflag=!this.showprecflag
  this.precflag=false
}
setprecflag(){
  this.showoldIndoorrecordsflag=false;
  this.scanflag=false;
  this.labflag=false;
  this.dischargeflag=false;
  this.vitalflag=false;
  this.reqscanflag=false
  this.reqlabflag=false
  this.showprecflag=false
  this.precflag=!this.precflag
}
}