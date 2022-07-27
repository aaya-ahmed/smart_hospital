import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';
import { ShardserviceService } from 'src/app/services/shardservice.service';

@Component({
  selector: 'app-in-patient',
  templateUrl: './in-patient.component.html',
  styleUrls: ['./in-patient.component.css']
})
export class InPatientComponent implements OnInit {
  inpatient:any[]=[]
  flag:boolean=false
  pageflag:boolean=false
  parameters={
    patientid:0,
    patientname:'',
    nurseid:0,
    nursename:'',
    indoorPatientId:0
  }
  id:number=0
  name:string=''
  constructor(private services:ServicesService,private router:Router,private shared:ShardserviceService) { }

  ngOnInit(): void {
    let user:any=localStorage.getItem('userInfo')
    let depid=JSON.parse(user).departmentId
    this.id=JSON.parse(user).id
    this.name=JSON.parse(user).firstName
    this.services.get("Patient/GetInDoorPatients/"+depid).subscribe(
     (res:any)=>{ 
      if(res.length==0){
        this.flag=true
        this.pageflag=false
      }
      else{
        this.inpatient=res
        this.flag=true
        this.pageflag=true

      }},
      err=>{
        this.flag=true
        this.pageflag=false
      }
      )
  }
  gotoaddvital(patient:any){
    let parameters={
      patientid:parseInt(patient.id),
      patientname:patient.firstName+" "+patient.lastName,
      nurseid:this.id,
      patientage:parseInt(patient.age),
      nursename:this.name,
      indoorPatientId:parseInt(patient.indoorPatientId),
    }
    this.shared.userinfo=parameters
    this.router.navigate(['/nurse/AddVitalSigns'])
  }
  gotoshowmedicine(patient:any){
    let parameters={
      patientid:parseInt(patient.id),
      patientname:patient.firstName+" "+patient.lastName,
      nurseid:this.id,
      patientage:parseInt(patient.age),
      nursename:this.name,
      indoorPatientId:parseInt(patient.indoorPatientId),
    }
    this.shared.userinfo=parameters
    this.router.navigate(['/nurse/checkmedicine'])
  }

  gotoshowvital(patient:any){
    let parameters={
      patientid:parseInt(patient.id),
      patientname:patient.firstName+" "+patient.lastName,
      nurseid:this.id,
      patientage:parseInt(patient.age),
      nursename:this.name,
      indoorPatientId:parseInt(patient.indoorPatientId),
    }
    this.shared.userinfo=parameters
    this.router.navigate(['/nurse/ShowVitalSigns'])
  }
}
