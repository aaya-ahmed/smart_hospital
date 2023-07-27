import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css','../../styles/profilestyle2.css']
})
export class ProfileComponent implements OnInit {

  doctor:any;
  updateflag:boolean=false
  today=new Date();
  requestList:any[]=[];
  image:any
  imagebase64:any
  doctorInfo:FormGroup=new FormGroup({
    username:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z0-9'-'\s]*")]),
    fname:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z ]+"), Validators.minLength(3), Validators.maxLength(10) ]),
    lname:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z ]+"), Validators.minLength(3), Validators.maxLength(10) ]),
    nid:new FormControl('',[Validators.required,Validators.pattern("^(2|3)[0-9]{6}(230)[0-9]{4}$"),Validators.minLength(14), Validators.maxLength(14)]),
    address:new FormControl(''),  
    gender:new FormControl('',[Validators.required]),
    age:new FormControl('',[Validators.required,Validators.min(20),Validators.max(90)]),
    mail:new FormControl('',[Validators.email]),
    bloodtype:new FormControl('',[Validators.required]),
    phonenumber:new FormControl('',[Validators.required,Validators.pattern("^(010|011|012|015)[0-9]{8}$") ,Validators.maxLength(11) ,Validators.minLength(11)]),
    }  );
    userpassword:FormGroup=new FormGroup({
      password:new FormControl('',[Validators.required,Validators.minLength(8)]),
      }  );
    srcimage:any;
    errorflag:boolean=false
    successflag:boolean=false
    passwordflag:boolean=false
  constructor(private service:ServicesService,private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("userInfo")){
      this.doctor=localStorage.getItem("userInfo")
      this.doctor=JSON.parse(this.doctor)
      this.srcimage="http://smarthospital.somee.com/api/"+ this.doctor.imageName+"?t="+new Date().getTime()
     }
  
    
    }
    get doctorAge(){
        return this.doctorInfo.controls['age']
      }
    get doctorUserName(){
      return this.doctorInfo.controls['username']
      } 
    get doctorFirstName(){
      return this.doctorInfo.controls['fname']
      } 
    get doctorLastName(){
      return this.doctorInfo.controls['lname']
      } 
    get doctorNationalId(){
      return this.doctorInfo.controls['nid']
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
        nid:this.doctor.nationalId,
        } )
      this.updateflag=true
    }
    
    update(){

      if(this.doctorInfo.valid){
        let doctor={
          id:this.doctor.id,
          firstName: this.doctorFirstName.value,
          lastName: this.doctorLastName.value,
          age: parseInt(this.doctorAge.value),
          nationalId: this.doctorNationalId.value,
          bloodType:this.doctorBloodType.value,
          phoneNumber: this.doctorPhone.value,
          address:  this.doctorAdress.value,
          gender: this.doctorGender.value,
          userName: this.doctorUserName.value,
          mail: this.doctorMail.value,
          docDegree:this.doctor.docDegree ,
          docSpecialization:this.doctor.docSpecialization,
          clinicalDoctor:this.doctor.clinicalDoctor,
          createdDtm:this.doctor.createdDtm,
          password: this.doctor.password,
          role: this.doctor.role,
          departmentId: this.doctor.departmentId,
          departmentName: this.doctor.departmentName,
          isActive:this.doctor.isActive
      }
        this.service.update("Doctor/update",doctor).subscribe(
         ( res:any)=>{
            delete res.passwordSalt
            delete res.passwordHash
            res.password=null
            res.role=null
            res.imageName=res.image
            res.image=null
            res.departmentName=this.doctor.departmentName
            this.doctor=res
            localStorage.removeItem("userInfo")
            localStorage.setItem("userInfo",JSON.stringify(this.doctor))
            this.successflag=true
            setTimeout(() => {
              this.successflag=false
            }, 2000);
          },
          err=>{
            this.errorflag=true
            setTimeout(() => {
              this.errorflag=false
            }, 2000);
          }
        )
      }
    }
    updatepassword(){
      if(this.userpassword.valid){
        let doctor=this.doctor
        doctor.password=this.doctorpassword.value
        this.service.update("Doctor/update",doctor).subscribe(
          res=>{
            this.userpassword.reset()
            this.passwordflag=false
          })

      }
    }
    openpassowordmodel(){
      this.passwordflag=!this.passwordflag
    }
    close(){
      this.updateflag=false
    }
    uploadfile(file:any){
      this.getBase64(file).then(
        data => {
          this.imagebase64=data;
          this.imagebase64=this.imagebase64.split(",").pop();
          let doctor=this.doctor
          doctor.password= null
          doctor.role=null
          doctor.image=this.imagebase64
          this.service.update("Doctor/update",doctor).subscribe(
           (res:any)=>{
             this.srcimage="http://smarthospital.somee.com/api/"+res.image+"?t="+new Date().getTime()
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
