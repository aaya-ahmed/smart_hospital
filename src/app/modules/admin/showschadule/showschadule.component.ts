import { Component, Input, OnInit } from '@angular/core';
import { doctors_schadule } from 'src/app/models/schadule';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-showschadule',
  templateUrl: './showschadule.component.html',
  styleUrls: ['./showschadule.component.css']
})
export class ShowschaduleComponent implements OnInit {
  toggle:boolean=false;
  p: number = 1;
  totallength:any
  schadules:doctors_schadule[]=[]
  tableflag:boolean=false;
  @Input('departments')departments:any[]=[];
  show:boolean=false
  id:number=0
  index1:number=0
  index2:number=0
  constructor(private services:ServicesService) { 
  }
  ngOnInit(): void {
  }
  getschadules(departmentid:any){
    let id=parseInt(departmentid.target.value)
    this.services.get("Schedule/GetSchedulesByDepartment_Id"+"/"+id).subscribe(
      (res:any)=>{
        this.schadules=res
        if(this.schadules.length>0){
        this.totallength=this.schadules.length
        this.tableflag=true
      }
     }
    );
  }
  delet(index1:number,index2:number){
    this.show=true
    this.id=this.schadules[index1].scheduleObjects[index2].scheduleId
    this.index1=index1
    this.index2=index2

  }
  deleteschadle(){
    this.services.delete('Schedule/DeleteSchedule/'+this.id).subscribe(
      res=>{
      },
      err=>{
        if(err.status==200){
          this.schadules[this.index1].scheduleObjects.splice(this.index2,1)
          this.show=false
        }
      }
    )
  }
  close(){
    this.show=false
  }
}
