import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';
import { ShardserviceService } from 'src/app/services/shardservice.service';

@Component({
  selector: 'app-show-medicine',
  templateUrl: './show-medicine.component.html',
  styleUrls: ['./show-medicine.component.css']
})
export class ShowMedicineComponent implements OnInit {
  user:any
  medicineList:any
  constructor(private shared:ShardserviceService,private service:ServicesService,private router:Router) { }  
  ngOnInit(): void {
    this.user=this.shared.userinfo;
    if(this.user.indoorPatientId==0){
      this.router.navigate(['../nurse/in-patient'])
    }
    else{
      this.service.get("Patient/GetLastPrescriptionByInDoorId/"+this.user.indoorPatientId).subscribe(
        (res:any)=>{
          this.medicineList=res
        })
      }
    }
  }


