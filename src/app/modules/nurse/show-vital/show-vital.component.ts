import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { showvitalnurse } from 'src/app/models/vital-sign';
import { ServicesService } from 'src/app/services/services.service';
import { ShardserviceService } from 'src/app/services/shardservice.service';

@Component({
  selector: 'app-show-vital',
  templateUrl: './show-vital.component.html',
  styleUrls: ['./show-vital.component.css']
})
export class ShowVitalComponent implements OnInit {
  user:any={
    patientid:0,
    patientname:"",
    nurseid:0,
    patientage:0,
    nursename:"",
    indoorPatientId:0
  }
  startflag:boolean=false
  endflag:boolean=false
  toggle:boolean=false
  st_end_flag:boolean=false
  p: number = 1;
  totallength:any;
  vital:showvitalnurse[]=[]
  today:any=new Date()
  constructor(private shared :ShardserviceService,private service:ServicesService,private router:Router) { }

  ngOnInit(): void {
    this.user=this.shared.userinfo;
    if(this.user.indoorPatientId==0){
      this.router.navigate(['../nurse/in-patient'])
    }
    else{
      this.today=this.today.toISOString().substring(0,8)+this.today.getDate()
      this.user=this.shared.userinfo
    }

  }
  getvitals(start:string,end:string){
    if(start==''){
      this.startflag=true
    }
    else{
      this.startflag=false
    }
    if(end==''){
      this.endflag=true
    }
    else{
      this.endflag=false
    }
    if(start<=end){
      if(end==this.today){
        const tomorrow = new Date(this.today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        end=tomorrow.toISOString().substring(0,8)+tomorrow.getDate()
      }
      this.service.get("VitalSigns/GetVitalSignesByRangeOfDateTime/"+this.user.patientid+"/"+start+"/"+end).subscribe(
        (res:any)=>{
          this.vital=res
          this.toggle=true
          this.st_end_flag=false
          this.totallength=this.vital.length
        }
      )
    }
    else{
      this.st_end_flag=true
    }
  }

onchange(){
  this.startflag=false
  this.endflag=false
}
}
