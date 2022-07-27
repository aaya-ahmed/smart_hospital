import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {  list_department } from 'src/app/models/department';
import {  doctorsList } from 'src/app/models/doctors';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['../style/users.css','./doctor.component.css','../style/modal.css']
})
export class DoctorComponent implements OnInit {
  doctorlist:any[]=[];
  templist:doctorsList[]=[];
  departments:list_department[]=[]
  //to show loading icon untill get data from backend make loadflag
  loadflag:boolean=true;
  /* to save original doctorlist when srarching ,we will make flag to save original doctorlist in temp list
  in first time search*/
  doctorflag:boolean=false;
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
  nationalidflag=true
  clinical:any=false
  addopflag=true;
  clinicalflag=false
  index:string=""
  temp:any;
  mess:string=''
  doctorInfo:FormGroup=new FormGroup({
    firstName:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z ]+"), Validators.minLength(3), Validators.maxLength(15) ]),
    lastName:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z ]+"), Validators.minLength(3), Validators.maxLength(20) ]),
    userName:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z0-9'-'\s]*")]),
    nationalId:new FormControl('',[Validators.required,Validators.pattern("^(2|3)[0-9]{6}(230)[0-9]{4}$"),Validators.minLength(14), Validators.maxLength(14)]),
    gender:new FormControl('',[Validators.required]),
    age:new FormControl('',[Validators.min(20),Validators.max(90)]),
    mail:new FormControl('',[Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(8)]),
    bloodType:new FormControl(''),
    phoneNumber:new FormControl('',[Validators.required,Validators.pattern("^(010|011|012|015)[0-9]{8}$") ,Validators.maxLength(11) ,Validators.minLength(11)]),
    address :new FormControl(''),
    departmentName :new FormControl('',[Validators.required]),
    docDegree :new FormControl('',[Validators.required]),
    docSpecialization :new FormControl('',[Validators.required]),
    image:new FormControl(''),
    createdDtm:new FormControl('',[Validators.required]),
    isActive:new FormControl('')
  }
  );
  constructor(private services:ServicesService ) { }
  ngOnInit(): void {
    //call doctor service to get all doctors 
    this.services.get("Doctor/GetAllDoctors").subscribe(
      (res:any)=>{
        this.doctorlist=res;
        this.totallength=this.doctorlist.length
        this.loadflag=false
        this.pageflag=true
      },
      (err)=>{
        this.loadflag=false
        this.pageflag=false
      }
      );
    //call department service to get all departments
     this.services.getdepartments().subscribe(res=>{this.departments=res;});
  }
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
  get doctorfname(){
    return this.doctorInfo.controls['firstName']
    }
    get doctorlname(){
      return this.doctorInfo.controls['lastName']
      }
    get doctorAge(){
        return this.doctorInfo.controls['age']
        }
    get doctorUserName(){
      return this.doctorInfo.controls['userName']
      } 
    get doctorNid(){
      return this.doctorInfo.controls['nationalId']
      } 
    get doctorGender(){
      return this.doctorInfo.controls['gender']
      }  
    get doctorSpecalization(){
       return this.doctorInfo.controls['docSpecialization']
    }   
    get doctorMail(){
      return this.doctorInfo.controls['mail']
      } 
    get doctorPassword(){
      return this.doctorInfo.controls['password']
      }
    get doctorPhone(){
      return this.doctorInfo.controls['phoneNumber']
      }
    get doctorAdress(){
      return this.doctorInfo.controls['address']
    }  
    get doctorDep(){
      return this.doctorInfo.controls['departmentName']
      }
    get doctorBloodType() {
      return this.doctorInfo.controls['bloodType'];
    } 
    get doctorDeg(){
      return this.doctorInfo.controls['docDegree']
      }
    get Hdate(){
        return this.doctorInfo.controls['createdDtm']
      }
    get doctoractive(){
      return this.doctorInfo.controls['isActive']
    }
    setdocclinical(event:any){
      if(event.target.value=="true"){
        this.clinical=true
      }
      else{
        this.clinical=false
      }
    }
    setdepartment(event:any){
      if(this.departments[event.target.value].isClinical==true){
        this.clinicalflag=true
      }
      else{
        this.clinicalflag=false
      }
    }
    adddoctor(){
      let doctor=this.doctorInfo.value
      doctor.role="Doctor",
      doctor.departmentId=this.departments[this.doctorInfo.controls['departmentName'].value].departmentId
      doctor.departmentName=this.departments[this.doctorInfo.controls['departmentName'].value].departmentName
      doctor.isActive=true
      doctor.age=parseInt(this.doctorInfo.controls['age'].value),	
      doctor.nationalId=String(this.doctorInfo.controls['nationalId'].value),
      doctor.departmentId=this.departments[this.doctorInfo.controls['departmentName'].value].departmentId,
      doctor.departmentName=this.departments[this.doctorInfo.controls['departmentName'].value].departmentName,
      doctor.image=this.imagebase64
      doctor.clinicalDoctor=this.clinical
      this.services.post("Doctor",doctor).subscribe(
        (res:any)=>{},
        (err:any)=>{
          this.modalflag=true;
          if(err.error.text!="Username already taken."){
            this.services.get("Doctor/GetAllDoctors").subscribe(
              (res:any)=>{
                this.doctorlist=res
                this.totallength=this.doctorlist.length
                this.successflag=true;
                setTimeout(() => {
                  this.doctorInfo.reset();
                  this.successflag=false;
                  this.submitted = false;
                }, 2000);
              },
              err=>{
                this.errorflag=true
              })
            }
          else if(err.error.text=="Username already taken."){
            this.errorflag=true
            this.mess="Username already taken."
            setTimeout(() => {
              this.errorflag=false;
              this.mess=''
            }, 2000);
            }
          })
    }
    updatedoctor(){
      let doctor:any={
        id:this.temp.id,
        firstName:this.doctorInfo.controls['firstName'].value,
        lastName: this.doctorInfo.controls['lastNname'].value,
        createdDtm: this.doctorInfo.controls['createdDtm'].value,
        age: parseInt(this.doctorInfo.controls['age'].value),
        nationalId: String(this.doctorInfo.controls['nationalId'].value),
        bloodType: this.doctorInfo.controls['bloodType'].value,
        phoneNumber:this.doctorInfo.controls['phoneNumber'].value,
        address: this.doctorInfo.controls['address'].value,
        gender: this.doctorInfo.controls['gender'].value,
        userName: this.doctorInfo.controls['username'].value,
        mail: this.doctorInfo.controls['mail'].value,
        departmentId: this.departments[this.doctorInfo.controls['departmentName'].value].departmentId,
        departmentName:this.departments[this.doctorInfo.controls['departmentName'].value].departmentName,
        isActive:this.doctorInfo.controls['isActive'].value ,
        docDegree: this.doctorInfo.controls['docDegree'].value,
        docSpecialization: this.doctorInfo.controls['docSpecialization'].value,
        clinicalDoctor:this.clinical
      };
      this.services.update("Doctor/update",doctor).subscribe(
        (res)=>{
          this.modalflag=true;
          this.services.get("Doctor/GetAllDoctors").subscribe(
            (res:any)=>{
              this.doctorlist=res;
              this.totallength=this.doctorlist.length}
              )
              this.successflag=true 
        },
        err=>{
          this.errorflag=true
        }
  
      );
      setTimeout(() => {
        this.successflag=false
        this.errorflag=false
      }, 2000);
    }
  submit(){
    this.submitted=true
    if(this.doctorInfo.valid&&this.nationalidflag){
      this.modalflag=false
      if(this.updateflag){
        this.updatedoctor()
      }
      else{
       this.adddoctor()
          }
        }
  }
  setDoctor(doc:any){
    this.temp=doc;
    let index=this.departments.findIndex(e=>e.departmentId==doc.departmentId)
    this.doctorInfo.patchValue({
      firstName:doc.firstName,
      lastName:doc.lastName,
      userName:doc.userName,
      nationalId:doc.nationalId,
      gender:doc.gender,
      age:doc.age,
      mail:doc.mail,
      bloodType:doc.bloodType,
      phoneNumber:doc.phoneNumber,
      address :doc.address,
      departmentName:index,
      docDegree :doc.docDegree,
      docSpecialization :doc.docSpecialization,
      createdDtm:doc.createdDtm.substring(0,10),
      isActive:doc.isActive,
      password:"12345679"
    });
    this.clinical=doc.clinicalDoctor
    if(this.departments[index].isClinical){
      this.clinicalflag=true
    }
    else{
      this.clinicalflag=false
    }
    this.updateflag=true;
  }
  search(docInf:any,allbtn:any){
  this.tableflag=false;
  let department=docInf.value.docdepartment;
  let state=docInf.value.docstate;
  let specialization=docInf.value.docspecialization;
  if(!this.doctorflag){
    this.templist=this.doctorlist;
    this.doctorlist=[];
    this.doctorflag=true;
    allbtn.disabled=false
  }
  this.doctorlist=[];
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
  this.totallength=this.doctorlist.length
  }
  searchby_state_and_department(state:string,department:string){
    for(let i of this.templist){
      if(String(i.isActive)==state&&department==i.departmentName){
        this.doctorlist.push(i)
      }
    }
    this.tableflag=true;
  }
  searchby_spec_and_department(department:string,specialization:string){
    for(let i of this.templist){
      if(i.docSpecialization==specialization&&department==i.departmentName){
        this.doctorlist.push(i)
      }
    }
    this.tableflag=true;
  }
  searchby_department(department:string){
    for(let i of this.templist){
      if(department==i.departmentName){
        this.doctorlist.push(i)
      }
    }
    this.tableflag=true;
  }
  searchby_state_spec(state:string,specialization:string){
    for(let i of this.templist){
      if(String(i.isActive)==state&&specialization==i.docSpecialization){
        this.doctorlist.push(i)
      }
    }
    this.tableflag=true;
  }
  searchby_state(state:string){
    for(let i of this.templist){
      if(String(i.isActive)==state){
        this.doctorlist.push(i)
      }
    }
    this.tableflag=true;
  }
  searchby_spec(specialization:string){
    for(let i of this.templist){
      if(i.docSpecialization==specialization){
        this.doctorlist.push(i)
      }
    }
    this.tableflag=true;
  }
  search_by_all(department:string,state:string,specialization:string){
    for(let i of this.templist){
      if(String(i.isActive)==state&&department==i.departmentName&&specialization==i.docSpecialization){
        this.doctorlist.push(i)
      }
    }
    this.tableflag=true;
  }
  alldoctor(){
    this.doctorlist=this.templist;
    this.doctorflag=false
    this.totallength=this.doctorlist.length
  }
  open_close_addmodule(){
    this.ModuleFlag=!this.ModuleFlag
    this.updateflag=false
  }
  reset(){
    this.doctorInfo.reset();
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
