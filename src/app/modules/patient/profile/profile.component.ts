import { Component, Input, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css','../../styles/profilestyle2.css']
})
export class ProfileComponent implements OnInit {
  patient:any;
  appointflag:boolean=false
  updateflag=false
  today=new Date();
  index:number=0;
  appointment:any[]=[];
  deletedApp:any;
  deleteMess:boolean=false;
  numOfAppoinments:number=0;
  numOfIndoorRec:number=0;
  srcimage:any
  submitted:boolean=false
  nationalidflag:boolean=false
  image:any
  successflag:boolean=false
  errorflag:boolean=false
  passwordflag:boolean=false
  patientInfo:FormGroup=new FormGroup({
    username:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z0-9'-'\s]*")]),
    fname:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z ]+"), Validators.minLength(3), Validators.maxLength(10) ]),
    lname:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z ]+"), Validators.minLength(6) ]),
    nid:new FormControl('',[Validators.required,Validators.pattern("^(2|3)[0-9]{6}(230)[0-9]{4}$"),Validators.minLength(14), Validators.maxLength(14)]),
    gender:new FormControl('',[Validators.required]),
    age:new FormControl('',[Validators.min(1),Validators.max(90)]),
    mail:new FormControl('',[Validators.email]),
    bloodtype:new FormControl('',[Validators.required]),
    phonenumber:new FormControl('',[Validators.required,Validators.pattern("^(010|011|012|015)[0-9]{8}$") ,Validators.maxLength(11) ,Validators.minLength(11)]),
    address :new FormControl(''),
    }  );
  userpassword:FormGroup=new FormGroup({
      password:new FormControl('',[Validators.required,Validators.minLength(8)])
    }  );
  constructor(private service:ServicesService) { }
 
  ngOnInit(): void {
    if(localStorage.getItem("userInfo")){
      this.patient=localStorage.getItem("userInfo")
      this.patient=JSON.parse(this.patient)
      this.srcimage="http://smarthospital.somee.com/api/"+this.patient.imageName+"?t="+new Date().getTime()
     }
     this.service.get("Appointment/GetAppointmentsByPatientId/"+this.patient.id).subscribe(
      (res:any)=>{
        this.appointment=res
        this.numOfAppoinments=this.appointment.length;
        if(this.numOfAppoinments>0){
          this.appointflag=true
        }
      }
     );
    this.service.get("Patient/GetIndoorPatientRecordsByPatientId/"+this.patient.id).subscribe(
      (res:any)=>{
        
        this.numOfIndoorRec=res.length;
      }
    )
    }
    cancelAppoinment(deletedApp:any,index:number){
      this.deleteMess=true;
      this.deletedApp=deletedApp;
      this.index=index;
    }
    ensureCancelAppoint(){
     
      this.service.delete("Appointment/CancelAppointment/"+this.appointment[this.index].appointmentId).subscribe(
        res=>{ 
         
         },
        err=>{ 
          this.appointment.splice(this.index,1)
          this.numOfAppoinments=this.appointment.length;
         }
      )
    }
    get patientFName(){
      return this.patientInfo.controls['fname']
      } 
      get patientLName(){
        return this.patientInfo.controls['lname']
        } 
        get patientNid(){
          return this.patientInfo.controls['nid']
          } 
    get patientAge(){
      return this.patientInfo.controls['age']
      }
  get patientUserName(){
    return this.patientInfo.controls['username']
    } 
  get patientGender(){
    return this.patientInfo.controls['gender']
    }   
  get patientMail(){
    return this.patientInfo.controls['mail']
    } 
  get patientPassword(){
    return this.patientInfo.controls['password']
    }
  get patientPhone(){
    return this.patientInfo.controls['phonenumber']
    }
  get patientAddress(){
    return this.patientInfo.controls['address']
  }  
  get patientBloodType() {
    return this.patientInfo.controls['bloodtype'];
  } 
  get patientpassword(){
    return this.userpassword.controls['password']
    }
  openmodel(){
    this.patientInfo.patchValue({
      fname:this.patient.firstName,
      lname:this.patient.lastName,
      nid:this.patient.nationalId,
      username:this.patient.userName,
      gender:this.patient.gender,
      age:this.patient.age,
      mail:this.patient.mail,
      bloodtype:this.patient.bloodType,
      phonenumber:this.patient.phoneNumber,
      address :this.patient.address
      } )
    this.updateflag=true
  }
  close(){
    this.updateflag=false
    this.deleteMess=false
  }
  
update(){
    this.submitted=true
    if(this.patientInfo.valid){
      let patient=this.patient
      patient.firstName=this.patientFName.value 
      patient.lastName= this.patientLName.value
      patient.patientage= parseInt(this.patientAge.value)
      patient.nationalId= String(this.patientNid.value)
      patient.bloodType= this.patientBloodType.value
      patient.phoneNumber= this.patientPhone.value
      patient.address=this.patientAddress.value
      patient.gender= this.patientGender.value
      patient.userName=this.patientUserName.value 
      patient.mail= this.patientMail.value
      this.service.update("Patient/update",patient).subscribe(
       (res:any)=>{
          this.successflag=true;
          setTimeout(() => {
            this.successflag=false;
            this.submitted=false
            this.userpassword.reset()
            this.patient=res
            this.patient.imageName=res.image
            this.patient.image=null
            this.patient.password=null
            delete this.patient.passwordHash
            delete this.patient.passwordSalt
            localStorage.removeItem("userInfo")
            localStorage.setItem("userInfo",JSON.stringify(this.patient))
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
      let newpatient=this.patient;
      newpatient.password=this.patientpassword.value;
      this.service.update("patient/update",newpatient).subscribe(
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
        this.image=data;
        this.image=this.image.split(",").pop()
        let patient=this.patient
        patient.image=this.image
      this.service.update("patient/update",patient).subscribe(
        (res:any)=>{
         delete res.passwordSalt
         delete res.passwordHash
         res.imageName=res.image
         res.image=null
         res.role=null
        res.password=null
         this.patient=res
         localStorage.removeItem("userInfo")
         localStorage.setItem("userInfo",JSON.stringify(this.patient))
         this.srcimage="http://smarthospital.somee.com/api/"+this.patient.imageName+"?t="+new Date().getTime()
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
  validationntionalid(event:any){
    let id=event.target.value
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
}
