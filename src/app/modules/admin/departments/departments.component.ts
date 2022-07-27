import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { all_department_info } from 'src/app/models/department';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css','../style/users.css','../style/modal.css']
})
export class DepartmentsComponent implements OnInit {
  department:all_department_info[]=[]
  toggleaddmodal:boolean=false;
  toggleupdatemodal:boolean=false;
  departmentflag:boolean=false;
  flag=false;
  newdepartment={
    id: 0,
    department_Name: '',
    location: '',
    isActive: true,
    clinicalDepartment: true
  }
  p: number = 1;
  totallength:any;
  successflag:boolean=false;
  errorflag:Boolean=false
  clinic:boolean=true
  constructor(private service:ServicesService) { }
  ngOnInit(): void {
    this.service.get("Departments/getAll").subscribe(
      (res:any)=>{
        this.department=res;
        this.totallength=this.department.length
        this.flag=true
      }
    )
  }
  setclinic(event:any){
  if(event.target.value=="true"){
    this.clinic=true
  }
  else{
    this.clinic=false
  }
  }
  postdepartment(form:NgForm){
    if(form.valid&&!this.departmentflag){
      let dept={ 
        departmentName: form.value.department_Name,
        departmentLocation: form.value.location,
        isActive: true,
        isClinical: this.clinic
      }
      this.service.post("Departments/add",dept).subscribe(
        (res:any)=>{},
        (err)=>{
          if(err.status==200){
            this.successflag=true
            this.service.get("Departments/getAll").subscribe(
              (res:any)=>{
                this.department=res;
                this.totallength=this.department.length
              }
            )
            setTimeout(() => {
              this.successflag=false
            }, 2000);
          }
          else{
            this.errorflag=true
            setTimeout(() => {
              this.errorflag=true
            }, 2000);
          }
        }
      )
    }
  }
  updateing(dept:any){
    this.toggleupdatemodal=!this.toggleupdatemodal
    this.newdepartment.id=dept.departmentId;
    this.newdepartment.department_Name=dept.departmentName;
    this.newdepartment.location=dept.departmentLocation;
    this.newdepartment.isActive=dept.isActive
    this.newdepartment.clinicalDepartment=dept.isClinical
  }
//update department information 
  update(form:NgForm){
    if(form.valid){
      this.newdepartment.location=form.value.location;
      if(form.value.isActive=='true'){
        this.newdepartment.isActive=true;
      }
      else{  this.newdepartment.isActive=false;}
      this.newdepartment.clinicalDepartment=Boolean(this.clinic)
      this.service.update("Departments/Update",this.newdepartment).subscribe(
        res=>{
          this.service.get("Departments/getAll").subscribe(
            (res:any)=>{
              this.successflag=true
              this.department=res;
              this.totallength=this.department.length
              setTimeout(() => {
                this.successflag=false
                this.toggleupdatemodal=!this.toggleupdatemodal
              }, 2000);
            })
          },
          err=>{
            this.errorflag=true
            setTimeout(() => {
              this.errorflag=false
            }, 1000);
          });
    }
  }
//close_openform method
//this method to open and close update form
  close_openform(){
    this.toggleupdatemodal=!this.toggleupdatemodal
  }
//togglemodalfunc method
//this method to open and close add form
togglemodalfunc(){
  this.toggleaddmodal=!this.toggleaddmodal
}
//to make sure new department not same name dept in department list
//make samedepartment func to compare between new department name and department names in department list
samedepartment(event:any){
  let name=event.target.value;
  if(this.department.find(e=>(e.departmentName.toLocaleLowerCase())==(name.toLocaleLowerCase()))){
    this.departmentflag=true;
  }
  else{
    this.departmentflag=false
  }
}
}
