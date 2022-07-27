import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-patient-appointment',
  templateUrl: './patient-appointment.component.html',
  styleUrls: ['./patient-appointment.component.css']
})
export class PatientAppointmentComponent implements OnInit {
  patients:any[]=[]
  appointment:any[]=[]
  appointflag:boolean=false
  constructor(private service:ServicesService) { }

  ngOnInit(): void {
    this.service.get("Patient/getAllPatients").subscribe(
      (res:any)=>{
        this.patients=res
      }
    )
  }
  getappoint(index:any){
    this.service.get("Appointment/GetAppointmentsByPatientId/"+this.patients[index.value].id).subscribe(
      (res:any)=>{
        this.appointment=res
        if(this.appointment.length>0){
        this.appointflag=true
      }
      else{
        this.appointflag=false
      }
    }
    )
  }

}
