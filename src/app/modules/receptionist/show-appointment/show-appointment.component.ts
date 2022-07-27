import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-show-appointment',
  templateUrl: './show-appointment.component.html',
  styleUrls: ['./show-appointment.component.css']
})
export class ShowAppointmentComponent implements OnInit {
  doctors:any[]=[]
  appointment:any[]=[]
  private doctorid:number=-1;
  today:any=new Date();
  appointflag:boolean=false
  constructor(private service:ServicesService) { }
  
  ngOnInit(): void {
    this.today=this.today.toISOString().slice(0,10)
    this.service.get("Doctor/getAllDoctors").subscribe(
     (res:any)=>{
        this.doctors=res
      }
    )

  }
  setdoctorid(id:any){
    this.doctorid=id.target.value
  }

  getappointment(){
    this.service.get("Appointment/GetAppointmentsForTodayByDoctorId/"+this.doctorid+"/"+this.today).subscribe(
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
  examine(patient:any){
    ///update appointment
  }

}
