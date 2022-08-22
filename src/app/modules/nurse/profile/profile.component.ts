import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css','../../styles/profilestyle2.css']
})
export class ProfileComponent implements OnInit {
  inpatientnumber:number=0
  updateflag:boolean=false
  inpatientflag:boolean=false
  passwordflag:boolean=false;
  submitted:boolean=false;
  successflag:boolean=false
  errorflag:boolean=false
  srcimage:string="../assets/profile.png"
  inpatient:any[]=[]
  nurse:any
  imagebase64:any
  department:string=''
  nurseInfo:FormGroup=new FormGroup({
    username:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z0-9'-'\s]*")]),
    fname:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z ]+"), Validators.minLength(3), Validators.maxLength(10) ]),
    lname:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z ]+"), Validators.minLength(3) ]),
    nid:new FormControl('',[Validators.required,Validators.pattern("^(2|3)[0-9]{6}(230)[0-9]{4}$"),Validators.minLength(14), Validators.maxLength(14)]),
    address:new FormControl(''),
    gender:new FormControl('',[Validators.required]),
    age:new FormControl('',[Validators.required,Validators.min(20),Validators.max(90)]),
    mail:new FormControl('',[Validators.email]),
    bloodtype:new FormControl(''),
    phonenumber:new FormControl('',[Validators.required,Validators.pattern("^(010|011|012|015)[0-9]{8}$") ,Validators.maxLength(11) ,Validators.minLength(11)]),
    }  );
  userpassword:FormGroup=new FormGroup({
      password:new FormControl('',[Validators.required,Validators.minLength(8)])
    }  );
  constructor(private service:ServicesService) { }

  ngOnInit(): void {
    if(localStorage.getItem("userInfo")){
      ///set nurse info
      this.nurse=localStorage.getItem("userInfo")
      this.nurse=JSON.parse(this.nurse)
      this.srcimage="https://smarthospital20220729232305.azurewebsites.net/api/"+this.nurse.imageName+"?t=" + new Date().getTime()
      this.department=this.nurse.departmentName
      /////get all in patient
      let departmentid=this.nurse.departmentId
      this.service.get("Patient/GetInDoorPatients/"+departmentid).subscribe(
        (res:any)=>{
          this.inpatient=res
          if(this.inpatient.length>0){
            this.inpatientflag=true;
            this.inpatientnumber=this.inpatient.length
          }
        }
      )
     }

  }
  get nurseFname(){
    return this.nurseInfo.controls['fname']
    }
  get nurseLname(){
    return this.nurseInfo.controls['lname']
    }
  get nurseAddress(){
    return this.nurseInfo.controls['address']
    }
  get nursenid(){
    return this.nurseInfo.controls['nid']
    }
  get nurseAge(){
    return this.nurseInfo.controls['age']
    }
  get nurseUserName(){
  return this.nurseInfo.controls['username']
  } 
  get nurseGender(){
    return this.nurseInfo.controls['gender']
  }  
  get nurseMail(){
    return this.nurseInfo.controls['mail']
  } 
  get nursePhone(){
    return this.nurseInfo.controls['phonenumber']
  }
get nurseAdress(){
  return this.nurseInfo.controls['address']
}  
get nurseBloodType() {
  return this.nurseInfo.controls['bloodtype'];
} 
get nursepassword(){
  return this.userpassword.controls['password']
  }
  openmodel(){
    this.nurseInfo.setValue({
      username:this.nurse.userName,
      gender:this.nurse.gender,
      age:this.nurse.age,
      mail:this.nurse.mail,
      bloodtype:this.nurse.bloodType,
      phonenumber:this.nurse.phoneNumber,
      address :this.nurse.address,
      fname:this.nurse.firstName,
      lname:this.nurse.lastName,
      nid:this.nurse.nationalId
      } )
    this.updateflag=true
  }
  close(){
    this.updateflag=false
  }
  update(){
    this.submitted=true
    if(this.nurseInfo.valid){
      let nurse=this.nurse
      nurse.firstName=this.nurseFname.value 
      nurse.lastName= this.nurseLname.value
      nurse.nurseage= parseInt(this.nurseAge.value)
      nurse.nationalId= this.nursenid.value
      nurse.bloodType= this.nurseBloodType.value
      nurse.phoneNumber= this.nursePhone.value
      nurse.address=this.nurseAddress.value
      nurse.gender= this.nurseGender.value
      nurse.userName=this.nurseUserName.value 
      nurse.mail= this.nurseMail.value
      this.service.update("Nurse/update",nurse).subscribe(
       (res:any)=>{
          this.successflag=true;
          setTimeout(() => {
            this.successflag=false;
            this.submitted=false
            this.userpassword.reset()
            this.nurse=res
            this.nurse.imageName=res.image
            this.nurse.image=null
            this.nurse.password=null
            delete this.nurse.passwordHash
            delete this.nurse.passwordSalt
            this.nurse.departmentName=this.department
            localStorage.removeItem("userInfo")
            localStorage.setItem("userInfo",JSON.stringify(this.nurse))
          }, 1000);

        },
        err=>{
          this.errorflag=true;
          setTimeout(() => {
            this.errorflag=false;
            this.submitted=false
          }, 1000);

        }
      )
      }
    }
  openpassowordmodel(){
    this.passwordflag=!this.passwordflag
  }
  updatepassword(){
    this.submitted=true
    if(this.userpassword.valid){
      let newnurse=this.nurse;
      newnurse.password=this.nursepassword.value;
      this.service.update("Nurse/update",newnurse).subscribe(
        res=>{
          this.successflag=true;
          setTimeout(() => {
            this.successflag=false;
            this.submitted=false
            this.userpassword.reset()
          }, 1000);

        },
        err=>{
          this.errorflag=true;
          setTimeout(() => {
            this.errorflag=false;
            this.submitted=false
          }, 1000);

        }
      )
    }

  }
  uploadfile(file:any){
    this.getBase64(file).then(
      data => {
        this.imagebase64=data;
        this.imagebase64=this.imagebase64.split(",").pop();
        let nurse=this.nurse
        nurse.image=this.imagebase64
        this.service.update("Nurse/update",nurse).subscribe(
         (res:any)=>{
          res.imageName=res.image
          res.password=null
          res.role=null
          res.image=null
          delete res.passwordHash
          delete res.passwordSalt
          res.departmentName=this.nurse.departmentName
          this.nurse=res
          localStorage.removeItem("Info")
          localStorage.setItem("Info",JSON.stringify(this.nurse))
          this.srcimage="https://smarthospital20220729232305.azurewebsites.net/api/"+res.imageName+"?t=" + new Date().getTime()  
          }
        )
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
