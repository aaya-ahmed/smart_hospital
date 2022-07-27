import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-schadule',
  templateUrl: './schadule.component.html',
  styleUrls: ['./schadule.component.css']
})
export class SchaduleComponent implements OnInit {
  department:any[]=[];
  color_btn:boolean=false;
  flag:boolean=false;
  constructor(private service:ServicesService) { }
  ngOnInit(): void {
    this.service.get("Departments/GetAllClinicalDept").subscribe(
      (res:any)=>{
        this.department=res
        this.flag=true
      }
      )}
  toggle:boolean=false;
  gotoaddschadule(){
    this.toggle=true;
    this.color_btn=true
  }
  gotoshowschadule(){
    this.toggle=false
    this.color_btn=false
  }
  
}
