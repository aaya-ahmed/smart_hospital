import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { addNewRoom, allRooms } from 'src/app/models/room';
import { ServicesService } from 'src/app/services/services.service';


@Component({
  selector: 'app-seat-beds',
  templateUrl: './seat-beds.component.html',
  styleUrls: ['../style/users.css','../style/modal.css','./seat-beds.component.css']
})
export class SeatBedsComponent implements OnInit {
 
  allRooms:allRooms[]=[{ roomType: '',numberOf_freeBeds: 0,numberOf_allBeds: 0,floorNumber: 0,roomNumber: 0}];
  rooms:allRooms[]=[]
  departementsList:any;
  submitted=true;
  searchingFlag=true;
  loadflag:boolean=true
  pageflag:boolean=true
  allflag:boolean=true
  ModuleFlag:boolean=false
  tableflag:boolean=true
  successflag:boolean=false
  errorflag:boolean=false

  p: number = 1;
  totallength:any;
    constructor(private services:ServicesService) { }
  
    ngOnInit(): void {
      this.services.get("Admin/GetAllRooms").subscribe(
        (res:any)=>
        {this.allRooms=res;
        this.rooms=this.allRooms;
        this.loadflag=false;
      },
      err=>{
        this.loadflag=false;
        this.pageflag=false
      }
      )
      this.services.getdepartments().subscribe(res=>
        {this.departementsList=res; 
          });
    }
    // when admin press on add room button    
 
    //when submit data of adding room
    addNewRoom(form:NgForm){
     if(form.valid){
      for(let i of this.allRooms){
        if(i.roomType==form.value.roomType&&i.floorNumber==form.value.floorNumber&&i.roomNumber==form.value.roomnumber){
          this.submitted=false;
          break;
        }
      } 
      if(this.submitted){ 
        let length=this.allRooms.length-1
        this.services.post("Admin/AddRoom",form.value).subscribe(
          (res:any)=>{
            this.allRooms.push(res);
            this.allRooms[length].numberOf_allBeds=form.value.numberOfBeds
            this.allRooms[length].numberOf_freeBeds=form.value.numberOfBeds
            
            this.successflag=true
          },
          err=>{
            this.errorflag=true
          });
        
      }  
      setTimeout(() => {
        this.successflag=false
        this.errorflag=false
        this.submitted=true
      }, 2000);
     }
     
    }
  
    search(roomInf:any){
      if(this.searchingFlag){
        this.rooms=this.allRooms
        this.allRooms=[]
        this.searchingFlag=false;
        this.allflag=false
      }
      this.allRooms=[]
      for(let i of this.rooms){
        if(i.roomNumber==roomInf.roomnum||i.roomType==roomInf.roomType||i.floorNumber==roomInf.floornum){
          this.allRooms.push(i);
        }
       
      }
    }
    allrooms(){
      this.searchingFlag=true
      this.allflag=true
      this.services.get("Admin/GetAllRooms").subscribe(
       ( res:any)=>
        {this.allRooms=res}
      )
  }
  open_close_addmodule(){
    this.ModuleFlag=!this.ModuleFlag
  }

}
