import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['../style/users.css',"./nurse.component.css","../style/modal.css"]
})

export class NurseComponent implements OnInit {
  nursesList:any[]=[]
  nursesTempList:any[]=[]
  departementsList:any[]=[]
  loadflag=true;
  pageflag=false;
  //to show addmodal
  addModuleFlag:boolean=false;
  //to show updatemodal
  updateModuleFlag:boolean=false;
  nationalidflag=true
   //to show table or loading icon when search we will make table flag
   tableflag:boolean=true;
   //to show loading icon untill send data to backend make addflag
   addflag:boolean=true;
   updateflag:boolean=false
   successflag:boolean=false;
   errorflag:boolean=false
   imagebase64:any="iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC"
   submitted:boolean=false
   searchflag:boolean=true
   nurseInfotemp:FormGroup=new FormGroup({
    nidtemp:new FormControl('',[Validators.required,Validators.pattern("^(2|3)[0-9]{13}$"),Validators.minLength(14), Validators.maxLength(14)]),
    departmenttemp:new FormControl('',[Validators.required]),
    degreetemp:new FormControl('',[Validators.required]),
    hdatetemp:new FormControl('',[Validators.required]),
    active:new FormControl('',[Validators.required])
   })
   NurseInfo:FormGroup=new FormGroup({
    firstName:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z][a-zA-Z ]+"), Validators.minLength(3), Validators.maxLength(25) ]),
    lastName:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z][a-zA-Z ]+"), Validators.minLength(3), Validators.maxLength(25) ]),
    userName:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z0-9_\s]*"),Validators.minLength(5)]),
    nationalId:new FormControl('',[Validators.required,Validators.pattern("^(2|3)[0-9]{6}(230)[0-9]{4}$"),Validators.minLength(14), Validators.maxLength(14)]),
    gender:new FormControl('',[Validators.required]),
    age:new FormControl('',[Validators.required,Validators.pattern("^[2-9]|[0-9]{2}$"),Validators.min(18),Validators.max(60)]),
    mail:new FormControl('',[Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(8)]),
    phoneNumber:new FormControl('',[Validators.required,Validators.pattern("^(010|011|012|015)[0-9]{8}$") ,Validators.maxLength(11) ,Validators.minLength(11)]),
    address :new FormControl(''),
    image :new FormControl(''),
    bloodType:new FormControl(''),
    departmentName :new FormControl('',[Validators.required]),
    nurseDegree :new FormControl('',[Validators.required]),
    createdDtm:new FormControl('',[Validators.required]),
    isActive:new FormControl('')});
   temp:any
   allflag:boolean=true
   p=1
   totallength=0
   constructor(private service:ServicesService) { }

  ngOnInit() {
    this.service.get("Nurse/getAllNurses").subscribe(
      (res:any)=>{
        this.nursesList=res;
        this.totallength=this.nursesList.length
        this.loadflag=false;
        this.pageflag=true
      },
      (err:any)=>{
        this.loadflag=false;
        this.pageflag=false
      });
    this.service.getdepartments().subscribe(
      res=>{
        this.departementsList=res
      });
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
  get nursefname(){
    return this.NurseInfo.controls['firstName']
  }
  get nurselname(){
      return this.NurseInfo.controls['lastName']
  }
  get nurseAge(){
    return this.NurseInfo.controls['age']
  }
  get nurseUserName(){
    return this.NurseInfo.controls['userName']
  } 
  get nurseNid(){
    return this.NurseInfo.controls['nationalId']
  } 
get nurseGender(){
    return this.NurseInfo.controls['gender']
  }  
get nurseMail(){
    return this.NurseInfo.controls['mail']
  } 
get nursePassword(){
    return this.NurseInfo.controls['password']
  }
get nursePhone(){
    return this.NurseInfo.controls['phoneNumber']
  }
get nurseAdress(){
    return this.NurseInfo.controls['address']
  }  
get nurseImage(){
    return this.NurseInfo.controls['image']
  }
get nurseDep(){
    return this.NurseInfo.controls['departmentName']
  }
get nurseBloodType() {
    return this.NurseInfo.controls['bloodType'];
  } 
get nurseDeg(){
    return this.NurseInfo.controls['nurseDegree']
  }
get Hdate(){
    return this.NurseInfo.controls['createdDtm']
  }
get nurseactive(){
    return this.NurseInfo.controls['isActive']
  } 
  setnurse(nurse:any){
    let index=this.departementsList.findIndex(e=>e.departmentId==nurse.departmentId)
    this.temp=nurse;
    this.updateflag=true
    this.NurseInfo.patchValue({
      firstName:this.temp.firstName,
      lastName:this.temp.lastName,
      userName:this.temp.userName,
      nationalId:this.temp.nationalId,
      gender:this.temp.gender,
      age:this.temp.age,
      mail:this.temp.mail,
      bloodType:this.temp.bloodType,
      phoneNumber:this.temp.phoneNumber,
      address :this.temp.address,
      departmentName :index,
      nurseDegree :this.temp.nurseDegree,
      createdDtm:this.temp.createdDtm.substring(0,10),
      isActive:this.temp.isActive,
      password:"12345679"
    });
  }
  addnurse(){
    let nurse=this.NurseInfo.value
    nurse.age=parseInt(this.nurseAge.value),
    nurse.nationalId=String(this.nurseNid.value),
    nurse.image=this.imagebase64,
    nurse.role="Nurse",
    nurse.isActive=true,
    nurse.departmentName=this.departementsList[this.nurseDep.value].departmentName,
    nurse.departmentId=parseInt(this.departementsList[this.nurseDep.value].departmentId),
    nurse.nurseSpecialization="",
    nurse.nurseNotes=''
    this.addflag=false
    this.service.post("Nurse",nurse).subscribe(
      res=>{},
      err=>{
        this.addflag=false;
        if(err.error.text!="Username already taken."){
            this.service.get("Nurse/getAllNurses").subscribe(
              (res:any)=>{
                this.nursesList=res
                this.successflag=true
                setTimeout(() => {
                  this.NurseInfo.reset();
                  this.addflag=true;
                  this.submitted=false
                  this.successflag=false;
                }, 1000);
              },
              err=>{
                this.errorflag=true
              }
            )
          }
        else{
          this.errorflag=true
          setTimeout(() => {
            this.errorflag=false;
            this.addflag=true;
            this.submitted=false
          }, 1000);
        }
      }
    )
  }
  upadatenurse(){
    let nurse=this.NurseInfo.value
    nurse.nurseSpecialization=this.temp.nurseSpecialization,
    nurse.id=this.temp.id
    nurse.age=parseInt(this.nurseAge.value),
    nurse.nationalId=String(this.nurseNid.value),
    nurse.image=this.imagebase64 ,
    nurse.departmentId=this.departementsList[this.nurseDep.value].departmentId,
    nurse.departmentName=this.departementsList[this.nurseDep.value].departmentName,
    nurse.isActive=this.nurseactive.value
    delete nurse.password
    this.service.update("Nurse/update",nurse).subscribe(
      res=>{
        this.service.get("Nurse/getAllNurses").subscribe(
          (res:any)=>{
            this.nursesList=res
            this.successflag=true
          })
        },
        err=>{
          this.errorflag=true
        });
      setTimeout(() => {
        this.successflag=false
        this.errorflag=false
      }, 1000);
  }
submitnurseData(){
  this.submitted=true
if(this.NurseInfo.valid){
  this.addflag=false
 if(this.updateflag){
  this.upadatenurse()
 }
 else{
  this.addnurse()
 }
 this.addflag=true
}
}
open_close_addmodule(){
    this.addModuleFlag=!this.addModuleFlag
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
allnurses(){
  this.searchflag=true;
  this.nursesList=this.nursesTempList
this.allflag=true
}
search(searchinfo:any){
  if(this.searchflag){
    this.nursesTempList=this.nursesList
    this.searchflag=false
    this.allflag=false
    this.nursesList=[]
  }
if(searchinfo.nursedepartment!=""&&searchinfo.nursestate!=""){
  this.nursesList=[]
  for(let i of this.nursesTempList ){
    if(i.departmentName==searchinfo.nursedepartment&&String(i.isActive)==searchinfo.nursestate){
      this.nursesList.push(i)
    }
  }
}
else if(searchinfo.nursedepartment!=""){
  this.nursesList=[]
  for(let i of this.nursesTempList ){
    if(i.departmentName==searchinfo.nursedepartment){
      this.nursesList.push(i)
    }
  }
}
else if(searchinfo.nursestate!=""){
  this.nursesList=[]
  for(let i of this.nursesTempList ){
    if(String(i.isActive)==searchinfo.nursestate){
      this.nursesList.push(i)
    }
  }
}
}
resetform(){
  this.NurseInfo.reset()
  this.submitted=false
  this.updateflag=false
}
}