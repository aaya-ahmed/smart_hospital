import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {  list_department } from 'src/app/models/department';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['../style/users.css','./employees.component.css','../style/modal.css']
})
export class EmployeesComponent implements OnInit {
  receptionistlist:any[]=[];
  templist:any[]=[];
  //to show loading icon untill get data from backend make loadflag
  loadflag:boolean=true;
  /* to save original receptionistlist when srarching ,we will make flag to save original receptionistlist in temp list
  in first time search*/
  receptionistflag:boolean=false;
  //to show table or loading icon when search we will make table flag
  tableflag:boolean=true;
  //to show loading icon untill send data to backend make modalflag
  modalflag:boolean=true;
  updateflag:boolean=false;
  //to show addmodal
  ModuleFlag:boolean=false;
  //to show updatemodal
  pageflag=false;
  //validation form flag
  submitted:boolean = false;
  successflag=false;
  errorflag=false
  imagebase64:any="iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC"
  p: number = 1;
  totallength:any;
  today=new Date().toISOString()
  receptionistInfo:FormGroup=new FormGroup({
    firstName:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z ]+"), Validators.minLength(3), Validators.maxLength(10) ]),
    lastName:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z ]+"), Validators.minLength(3), Validators.maxLength(10) ]),
    userName:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z0-9'-'\s]*")]),
    nationalId:new FormControl('',[Validators.required,Validators.pattern("^(2|3)[0-9]{6}(230)[0-9]{4}$"),Validators.minLength(14), Validators.maxLength(14)]),
    gender:new FormControl('',[Validators.required]),
    age:new FormControl('',[Validators.min(20),Validators.max(90)]),
    mail:new FormControl('',[Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(8)]),
    bloodType:new FormControl(''),
    phoneNumber:new FormControl('',[Validators.required,Validators.pattern("^(010|011|012|015)[0-9]{8}$") ,Validators.maxLength(11) ,Validators.minLength(11)]),
    address :new FormControl(''),
    image:new FormControl(''),
    createdDtm:new FormControl('',[Validators.required]),
    isActive:new FormControl('')
  }
  );
  addopflag=true;
  index:string=""
  temp:any;
  constructor(private services:ServicesService ) { }
  ngOnInit(): void {
    //call receptionist service to get all receptionists 
    this.services.get("Admin/getAllReceptionists").subscribe(
      (res:any)=>{
        this.receptionistlist=res;
        this.totallength=this.receptionistlist.length
        this.loadflag=false
        this.pageflag=true
      },
      (err)=>{
        this.loadflag=false
        this.pageflag=false
      }
      );
  }
  nationalidflag=true
  validationntionalid(event:any){
    let id=event.target.value
    if(parseInt(id.substring(0,1))==2){
      if(parseInt(id.substring(1,3))>22){
        if((parseInt(id.substring(3,5))<13)&&(parseInt(id.substring(3,5))>0)){
        if((parseInt(id.substring(5,7))<=31)&&(parseInt(id.substring(5,7))>0)){
          this.nationalidflag=true;
        }
        else{
          this.nationalidflag=false;
        }
        }
        else{ this.nationalidflag=false;}
      }
      else{ this.nationalidflag=false;}
    }
    else{
        if((parseInt(id.substring(3,5))<13)&&(parseInt(id.substring(3,5))>0)){
        if((parseInt(id.substring(5,7))<=31)&&(parseInt(id.substring(5,7))>0)){
          this.nationalidflag=true;
        }
        else{
          this.nationalidflag=false;
        }
        }
        else{ this.nationalidflag=false;}
    }
  
  }
  get receptionistfname(){
    return this.receptionistInfo.controls['firstName']
    }
    get receptionistlname(){
      return this.receptionistInfo.controls['lastName']
      }
    get receptionistAge(){
        return this.receptionistInfo.controls['age']
        }
    get receptionistUserName(){
      return this.receptionistInfo.controls['userName']
      } 
    get receptionistNid(){
      return this.receptionistInfo.controls['nationalId']
      } 
    get receptionistGender(){
      return this.receptionistInfo.controls['gender']
      }  
    get receptionistMail(){
      return this.receptionistInfo.controls['mail']
      } 
    get receptionistPassword(){
      return this.receptionistInfo.controls['password']
      }
    get receptionistPhone(){
      return this.receptionistInfo.controls['phoneNumber']
      }
    get receptionistAdress(){
      return this.receptionistInfo.controls['address']
    }  
    get receptionistBloodType() {
      return this.receptionistInfo.controls['bloodType'];
    } 
    get Hdate(){
        return this.receptionistInfo.controls['createdDtm']
      }
        get receptionistactive(){
          return this.receptionistInfo.controls['isActive']
        }
  updateReceptionist(){
    let receptionist=this.receptionistInfo.value
    receptionist.id=this.temp.id
    receptionist.age= parseInt(this.receptionistInfo.controls['age'].value)
    receptionist.nationalId= String(this.receptionistInfo.controls['nationalId'].value)
    receptionist.image=this.imagebase64
    delete receptionist.password
    this.services.update("Admin/updateReceptionist",receptionist).subscribe(
      (res)=>{
        this.modalflag=true;
        this.successflag=true 
      },
      err=>{
        this.errorflag=true
      });
    setTimeout(() => {
      this.successflag=false
      this.errorflag=false
      window.location.reload()
    }, 1000);
  }
  addReceptionist(){
    let receptionist=this.receptionistInfo.value
    receptionist.age=parseInt(this.receptionistInfo.controls['age'].value)
    receptionist.nationalId=String(this.receptionistInfo.controls['nationalId'].value)
    receptionist.role="Receptionist"
    receptionist.isActive=true
    receptionist.image=this.imagebase64
    this.services.post("Admin/receptionist",receptionist).subscribe(
      (res:any)=>{},
      (err:any)=>{
        if(err.error.text!="Username already taken."){
          this.services.get("Admin/getAllReceptionists").subscribe(
            (res:any)=>{
              this.receptionistlist=res;
              this.totallength=this.receptionistlist.length
              this.modalflag=true;
              this.successflag=true;
              setTimeout(() => {
                this.receptionistInfo.reset();
                this.successflag=false;
                this.submitted = false;
              }, 2000);
            },
            err=>{
              this.errorflag=true
            })
          }
          else{
            this.errorflag=true
            setTimeout(() => {
              this.errorflag=false;
            }, 2000);
          }
        })
  }
  submit(){
    this.submitted=true
    if(this.receptionistInfo.valid){
      this.modalflag=false
      if(this.updateflag){
        this.updateReceptionist()
      }
      else{
        this.addReceptionist()
    }
  }
  }
  setreceptionist(doc:any){
    this.temp=doc;
    this.imagebase64=this.temp.image
    this.receptionistInfo.patchValue({
      firsName:doc.firstName,
      lastName:doc.lastName,
      userName:doc.userName,
      nationalId:doc.nationalId,
      gender:doc.gender,
      age:doc.age,
      mail:doc.mail,
      bloodType:doc.bloodType,
      phoneNumber:doc.phoneNumber,
      address :doc.address,
      createdDtm:doc.createdDtm.substring(0,10),
      isActive:doc.isActive,
      password:"12345679"
    });
    this.updateflag=true;
  }
  search(docInf:any,allbtn:any){
  this.tableflag=false;
  let department=docInf.value.docdepartment;
  let state=docInf.value.docstate;
  let specialization=docInf.value.docspecialization;
  if(!this.receptionistflag){
    this.templist=this.receptionistlist;
    this.receptionistlist=[];
    this.receptionistflag=true;
    allbtn.disabled=false
  }
  this.receptionistlist=[];
  if(department&&state&&specialization){
    this.search_by_all(department,state,specialization)
  }
  else if(department){
    if(state){
      this.searchby_state_and_department(state,department)
    }
    else if(specialization){
      this.searchby_spec_and_department(department,specialization)
    }
    else{
      this.searchby_department(department)
    }
  }
  else if(state){
    if(specialization){
      this.searchby_state_spec(state,specialization)
    }
    else{
      this.searchby_state(state)
    }
  }
  else if(specialization){
    this.searchby_spec(specialization)
  }
  this.totallength=this.receptionistlist.length
  }
  searchby_state_and_department(state:string,department:string){
    for(let i of this.templist){
      if(String(i.isActive)==state&&department==i.departmentName){
        this.receptionistlist.push(i)
      }
    }
    this.tableflag=true;
  }
  searchby_spec_and_department(department:string,specialization:string){
    for(let i of this.templist){
      if(i.docSpecialization==specialization&&department==i.departmentName){
        this.receptionistlist.push(i)
      }
    }
    this.tableflag=true;
  }
  searchby_department(department:string){
    for(let i of this.templist){
      if(department==i.departmentName){
        this.receptionistlist.push(i)
      }
    }
    this.tableflag=true;
  }
  searchby_state_spec(state:string,specialization:string){
    for(let i of this.templist){
      if(String(i.isActive)==state&&specialization==i.docSpecialization){
        this.receptionistlist.push(i)
      }
    }
    this.tableflag=true;
  }
  searchby_state(state:string){
    for(let i of this.templist){
      if(String(i.isActive)==state){
        this.receptionistlist.push(i)
      }
    }
    this.tableflag=true;
  }
  searchby_spec(specialization:string){
    for(let i of this.templist){
      if(i.docSpecialization==specialization){
        this.receptionistlist.push(i)
      }
    }
    this.tableflag=true;
  }
  search_by_all(department:string,state:string,specialization:string){
    for(let i of this.templist){
      if(String(i.isActive)==state&&department==i.departmentName&&specialization==i.docSpecialization){
        this.receptionistlist.push(i)
      }
    }
    this.tableflag=true;
  }
  allreceptionist(){
    this.receptionistlist=this.templist;
    this.receptionistflag=false
    this.totallength=this.receptionistlist.length
  }
  open_close_addmodule(){
    this.ModuleFlag=!this.ModuleFlag
    this.updateflag=false
  }
  reset(){
    this.receptionistInfo.reset();
    this.submitted=false;
  }
  uploadfile(file:any){
    this.getBase64(file).then(
      data => {
        this.imagebase64=data;
        this.imagebase64=this.imagebase64.split(",").pop();
         });
  }
  getBase64(file:any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      reader.onload = () =>{ resolve(reader.result)};
      reader.onerror = error => reject(error);
    });
  }
}
  