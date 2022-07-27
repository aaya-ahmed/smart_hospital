import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { doctors_schadule, newDocSchadule } from 'src/app/models/schadule';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-setschadule',
  templateUrl: './setschadule.component.html',
  styleUrls: ['./setschadule.component.css']
})
export class SetschaduleComponent implements OnInit {
  @Input('departments')departments:any[]=[];
  schadules:doctors_schadule[]=[]
  tempSchadule:doctors_schadule={
    doctorId: 0,
    doctorName: '',
    scheduleObjects: []
  }
  newschadule:newDocSchadule={
    doctorId:0,
    dayOfWork:0,
    startTime:'',
    endTime:'',
    timePerPatient:''
}
schadulemodified={
    id: 0,
    doctorId: 0,
    dayOfWork: 0,
    startTime: '',
    endTime: '',
    timePerPatient: ''
  
}
schadulemodified1={
  dayOfWork: 0,
  startTime: '',
  endTime: '',
  timePerPatient: ''

}
timeOfWork:{day:number,times:{st:string,et:string}[]}[]=[
  {day:0,times:[]},
  {day:1,times:[]}, 
  {day:2,times:[]}, 
  {day:3,times:[]},
  {day:4,times:[]},
  {day:5,times:[]},
  {day:6,times:[]}
];
allnewschadule:newDocSchadule[]=[]
updateform:FormGroup=new FormGroup(
 { dayofwork:new FormControl('',[Validators.required]),
starttime:new FormControl('',[Validators.required]),
endtime:new FormControl('',[Validators.required]),
perpatienttime:new FormControl('',[Validators.required,Validators.pattern("^(00):([1-5]?[0-9]?)$")])
}
)
  errormessage:String='No Items'
  doctorFlag:boolean=false
  tableflag:boolean=false
  timeflag=false
  schaduletableflag:boolean=false;
  addNewSchaduleFlag:boolean=false;
  submitted:boolean=false;
  doctorlist:string[]=[]
  addflag:boolean=true;
  departmentflag:boolean=false
  check:boolean=true
  successflag:boolean=false;
  errorflag:boolean=false
  constructor(private services:ServicesService) { }
  ngOnInit(): void {
  }
  getschadules(departmentid:any){
    let id=parseInt(departmentid.target.value)
    this.tableflag=false
    this.services.get("Schedule/GetSchedulesByDepartment_Id"+"/"+id).subscribe(
      (res:any)=>{
        this.schadules=res
        if(this.schadules.length>0){
          this.doctorFlag=true;
          this.timeOfWork=[
            {day:0,times:[]},
            {day:1,times:[]}, 
            {day:2,times:[]}, 
            {day:3,times:[]},
            {day:4,times:[]},
            {day:5,times:[]},
            {day:6,times:[]}
          ];
          this.set_timeofwork();
        }
        else{
          this.doctorFlag=false
        }
        
     },
      (err:any)=>{
        this.errormessage='Not Found'
        this.doctorFlag=false;
      }
    );
  }
  getdoctorschadule(index:any){
    let indexDoctor=parseInt(index.target.value)
    this.tempSchadule={
      doctorId: 0,
      doctorName: '',
      scheduleObjects: []
    }
    this.tempSchadule=this.schadules[indexDoctor]
      this.tableflag=true
  }
  addnew(){
    this.addNewSchaduleFlag=true;
  }
  add_to_new_schadule_list(schaduleform:any){
    this.submitted=true
    this.timeflag=false
    this.checktime(schaduleform.value.starttime,schaduleform.value.endtime)
    if(schaduleform.valid&&this.timeflag){
      this.departmentflag=true
      let id=this.tempSchadule.doctorId
    let newschadule={
      doctorId:id,
      dayOfWork:parseInt(schaduleform.value.workday),
      startTime:schaduleform.value.starttime,
      endTime:schaduleform.value.endtime,
      timePerPatient:schaduleform.value.perpatient
  };
  this.checkschadule(newschadule);
  if(this.check){
    this.allnewschadule.push(newschadule);
    this.doctorlist.push(this.tempSchadule.doctorName)
    schaduleform.reset()
    this.submitted=false
    this.schaduletableflag=true
  }
  else{
setTimeout(() => {
  this.check=true
}, 1000);
    this.submitted=true
  }

}
  }
  submitallschadule(){
    this.services.post("Schedule",this.allnewschadule).subscribe(
      (res:any)=>{
        
        this.successflag=true;
        setTimeout(() => {
          this.successflag=false;
          this.allnewschadule=[];
        this.schaduletableflag=false
        this.departmentflag=false
        }, 2000);
      },
      err=>{
        this.errorflag=true;
        setTimeout(() => {
          this.errorflag=false;
        }, 2000);
      }
    );
  }
  setschadulemodified(index:number){
    this.updateform.setValue({
      dayofwork:this.tempSchadule.scheduleObjects[index].dayOfWork,
      starttime: this.tempSchadule.scheduleObjects[index].startTime.substring(0,5),
      endtime:this.tempSchadule.scheduleObjects[index].endTime.substring(0,5),
      perpatienttime:this.tempSchadule.scheduleObjects[index].timePerPatient.substring(0,5)
    })
    this.schadulemodified.id= this.tempSchadule.scheduleObjects[index].scheduleId
    this.schadulemodified.doctorId= this.tempSchadule.doctorId;
    this.schadulemodified.dayOfWork=this.tempSchadule.scheduleObjects[index].dayOfWork
    this.schadulemodified.startTime=this.tempSchadule.scheduleObjects[index].startTime.substring(0,5)
    this.schadulemodified.endTime=this.tempSchadule.scheduleObjects[index].endTime.substring(0,5)
    this.schadulemodified.timePerPatient=this.tempSchadule.scheduleObjects[index].timePerPatient.substring(0,5)
    let indextemp=this.timeOfWork[this.schadulemodified.dayOfWork].times.findIndex(e=>e.st==this.schadulemodified.startTime)
    this.timeOfWork[this.schadulemodified.dayOfWork].times.splice(indextemp,1);
    this.addflag=false;
  }
  update(){
    this.submitted=true;
    this.checktime(this.updateform.controls['starttime'].value,this.updateform.controls['endtime'].value)
if(this.updateform.valid&&this.timeflag){
  this.schadulemodified.doctorId= this.tempSchadule.doctorId;
  this.schadulemodified.dayOfWork=parseInt(this.updateform.controls['dayofwork'].value )
  this.schadulemodified.startTime=this.updateform.controls['starttime'].value
  this.schadulemodified.endTime=this.updateform.controls['endtime'].value
  this.schadulemodified.timePerPatient=this.updateform.controls['perpatienttime'].value
  this.checkschadule(this.schadulemodified)
  if(this.check){
    this.services.update("Schedule/UpdateSchedule",this.schadulemodified).subscribe(
         ( res:any)=>{
           let index=this.schadules.findIndex((e:any)=>e.doctorId==res.doctorId)
           let index2=this.schadules[index].scheduleObjects.findIndex(e=>e.scheduleId==res.id)
          this.schadules[index].scheduleObjects.splice(index2,1)

           this.schadules[index].scheduleObjects.push({
            dayOfWork: res.dayOfWork,
            scheduleId: res.id,
            endTime:res.endTime,
             startTime:res.startTime,
            timePerPatient:res.timePerPatient
            })
            this.successflag=true;
            setTimeout(() => {
              this.successflag=false;
              this.addflag=true;
              this.submitted=false
              this.timeflag=false
            }, 2000);
          
          },
          err=>{
            this.errorflag=true;
            setTimeout(() => {
              this.errorflag=false;
              
            }, 2000);
          }
        )
      }
  else{
    setTimeout(() => {
      this.check=true
    }, 2000);
  }
}
}    
 
  cancelupdate(){
    this.addflag=true;
  }
  set_timeofwork(){
    for(let i of this.schadules){
      for(let j of i.scheduleObjects){
        switch(j.dayOfWork){
          case 0:
            this.timeOfWork[0].times.push({'st':j.startTime,'et':j.endTime})
            break;
          case 1:
            this.timeOfWork[1].times.push({'st':j.startTime,'et':j.endTime})
            break;
          case 2:
            this.timeOfWork[2].times.push({'st':j.startTime,'et':j.endTime})
            break;
          case 3:
            this.timeOfWork[3].times.push({'st':j.startTime,'et':j.endTime})
            break;
          case 4:
            this.timeOfWork[4].times.push({'st':j.startTime,'et':j.endTime})
            break;
          case 5:
            this.timeOfWork[5].times.push({'st':j.startTime,'et':j.endTime})
            break;
          case 6:
            this.timeOfWork[6].times.push({'st':j.startTime,'et':j.endTime})
            break;
        }
      }
    }
  }
checkschadule(object:any){
    this.timeOfWork[object.dayOfWork].times =  this.timeOfWork[object.dayOfWork].times.sort((first, second) => 0 - (first.st > second.st ? -1 : 1));
    let len=this.timeOfWork[object.dayOfWork].times.length
    if(len>0){
        if(((object.startTime<=this.timeOfWork[object.dayOfWork].times[0].st)&&(object.endTime<=this.timeOfWork[object.dayOfWork].times[0].st))||
        ((object.startTime>=this.timeOfWork[object.dayOfWork].times[len-1].et)&&(object.endTime>=this.timeOfWork[object.dayOfWork].times[len-1].et)))
        {
          this.timeOfWork[object.dayOfWork].times.push({'st':object.startTime,'et':object.endTime})
          this.check=true;
        }
      else{
        this.check=false;
        for(let i=0;i<len-2;i++){
          if((object.startTime>=this.timeOfWork[object.dayOfWork].times[i].et)&&(object.endTime<=this.timeOfWork[object.dayOfWork].times[i+1].st)){
            this.timeOfWork[object.dayOfWork].times.push({'st':object.startTime,'et':object.endTime})    
            this.check= true;
                break;
            }
          }
      }
    }
  else{
    this.timeOfWork[object.dayOfWork].times.push({'st':object.startTime,'et':object.endTime})  
    this.check=true;
  }
  }
  deleteschadule(obj:newDocSchadule){
    let timeIndex=this.timeOfWork[obj.dayOfWork].times.findIndex(e=>e.st==obj.startTime);
    this.timeOfWork[obj.dayOfWork].times.splice(timeIndex,1)
    let index=this.allnewschadule.findIndex(e=>e.startTime==obj.startTime)
    this.doctorlist.splice(index,1)
    this.allnewschadule.splice(index,1);
    if(this.allnewschadule.length==0){
      this.schaduletableflag=false
      this.departmentflag=false
    }
  }
  checktime(start:any,end:any){
    if(start>end){
      this.timeflag=false
    }
    else{
      this.timeflag=true
    }
  }
  resetchecktime(start:any,end:any){
    if(start.value!=''&&end.value!=''&&end.value>start.value){
      this.timeflag=false
    }
  }

}
