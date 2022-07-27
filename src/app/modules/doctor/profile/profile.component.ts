import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/services/services.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  doctor:any;
  numOfIndoors=0;
  appointflag:boolean=false
  updateflag:boolean=false
  today=new Date();
  todayDate=''
  numberDetails:any={"numberOfTodayAppointment": 0,"numberOfAllAppointments": 8,"numberOfInDoorPatients": 2}
  appointment:any[]=[];
  image:any="../assets/profile.png"
  doctorInfo:FormGroup=new FormGroup({
    username:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z0-9'-'\s]*")]),
    fname:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z ]+"), Validators.minLength(3), Validators.maxLength(10) ]),
    lname:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z ]+"), Validators.minLength(3),Validators.maxLength(14) ]),
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
    nationalidflag:boolean=false
    imagesrc:any
    passwordflag:boolean=false
    submitted:boolean=false
    successflag:boolean=false;
    errorflag:boolean=false

  constructor(private service:ServicesService) { }

  ngOnInit(): void {
    if(localStorage.getItem("userInfo")){
      this.doctor=localStorage.getItem("userInfo")
      this.doctor=JSON.parse(this.doctor)
     }
    this.imagesrc="https://localhost:7163/"+this.doctor.imageName+"?t="+new Date().getTime()
    this.todayDate=this.today.toISOString().substring(0,10)
    this.service.get("Appointment/GetAppointmentsForTodayByDoctorId/"+this.doctor.id+"/"+this.todayDate).subscribe(
      (res:any)=>{
        this.appointment=res
        if(this.appointment.length>0){
          this.appointflag=true
        }
      }
     );
     this.service.get('Appointment/GetAppointmentsDetailsByDoctorId/'+this.doctor.id+'/'+this.todayDate).subscribe(
      (res:any)=>{
        this.numberDetails=res;
              }     )
    }
    get doctorFname(){
      return this.doctorInfo.controls['fname']
      }
    get doctorLname(){
      return this.doctorInfo.controls['lname']
      }
    get doctorAddress(){
      return this.doctorInfo.controls['address']
      }
    get doctornid(){
      return this.doctorInfo.controls['nid']
      }
    get doctorAge(){
      return this.doctorInfo.controls['age']
      }
    get doctorUserName(){
    return this.doctorInfo.controls['username']
    } 
    get doctorGender(){
      return this.doctorInfo.controls['gender']
    }  
    get doctorMail(){
      return this.doctorInfo.controls['mail']
    } 
    get doctorPhone(){
      return this.doctorInfo.controls['phonenumber']
    }
  get doctorAdress(){
    return this.doctorInfo.controls['address']
  }  
  get doctorBloodType() {
    return this.doctorInfo.controls['bloodtype'];
  } 
  get doctorpassword(){
    return this.userpassword.controls['password']
    }
    openmodel(){
      this.doctorInfo.setValue({
        username:this.doctor.userName,
        gender:this.doctor.gender,
        age:this.doctor.age,
        mail:this.doctor.mail,
        bloodtype:this.doctor.bloodType,
        phonenumber:this.doctor.phoneNumber,
        address :this.doctor.address,
        fname:this.doctor.firstName,
        lname:this.doctor.lastName,
        nid:this.doctor.nationalId
        } )
      this.updateflag=true
    }
    close(){
      this.updateflag=false
    }
    openpassowordmodel(){
      this.passwordflag=!this.passwordflag
    }
    updatepassword(){
      this.submitted=true
      if(this.userpassword.valid){
        let newdoctor=this.doctor;
        newdoctor.password=this.doctorpassword.value;
        this.service.update("Doctor/update",newdoctor).subscribe(
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
    update(){
      this.submitted=true
      if(this.doctorInfo.valid){
        let doctor=this.doctor
        doctor.firstName=this.doctorFname.value 
        doctor.lastName= this.doctorLname.value
        doctor.doctorage= parseInt(this.doctorAge.value)
        doctor.nationalId= this.doctornid.value
        doctor.bloodType= this.doctorBloodType.value
        doctor.phoneNumber= this.doctorPhone.value
        doctor.address=this.doctorAddress.value
        doctor.gender= this.doctorGender.value
        doctor.userName=this.doctorUserName.value 
        doctor.mail= this.doctorMail.value
        doctor.password=null
        this.service.update("Doctor/update",doctor).subscribe(
         (res:any)=>{
            this.successflag=true;
            setTimeout(() => {
              this.successflag=false;
              this.submitted=false
              this.userpassword.reset()
              res.imageName=res.image
              res.image=null
              res.password=null
              res.departmentName=this.doctor.departmentName
              delete res.passwordHash
              delete res.passwordSalt
              this.doctor=res
            localStorage.removeItem("userInfo")
            localStorage.setItem("userInfo",JSON.stringify(this.doctor))
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
      checkappoint(appointobj:any){
        let AppointmentId=parseInt(appointobj.AppointmentId)
        let Examined=true
        this.service.updatewithoutbody("Appointment/ExaminedAppointment/"+AppointmentId+"/"+Examined).subscribe(
          res=>{
          },
          err=>{}
        )
      }
    uploadfile(file:any){
      this.getBase64(file).then(
        data => {
          this.image=data;
          this.image=this.image.split(",").pop()
          let doctor=this.doctor
          doctor.image=this.image
        this.service.update("Doctor/update",doctor).subscribe(
          (res:any)=>{
           delete res.passwordSalt
           delete res.passwordHash
           res.imageName=res.image
           res.image=null
           res.role=null
          res.password=null
          res.departmentName=this.doctor.departmentName
           this.doctor=res
           localStorage.removeItem("userInfo")
           localStorage.setItem("userInfo",JSON.stringify(this.doctor))
           this.imagesrc="https://localhost:7163/"+this.doctor.imageName+"?t="+new Date().getTime()
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
