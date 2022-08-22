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
  admin:any;
  updateflag:boolean=false
  today:any=new Date();
  image:any
  imagesrc:any
  submitted:boolean=false
  errorflag:boolean=false
  nationalidflag:boolean=false;
  employeesnumber={
    doctors: 0,
    nurses: 0,
    receptionist: 0,
    inpatient: 0,
    outpatient: 0,
    todayappointment: 0,
    allappointment: 0
  }
  AdminInfo:FormGroup=new FormGroup({
    fname:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z ]+"), Validators.minLength(3), Validators.maxLength(7) ]),
    lname:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z ]+"), Validators.minLength(3), Validators.maxLength(7) ]),
    gender:new FormControl('',[Validators.required]),
    age:new FormControl('',[Validators.required,Validators.min(20),Validators.max(90)]),
    mail:new FormControl('',[Validators.email]),
    bloodtype:new FormControl('',[Validators.required]),
    phonenumber:new FormControl('',[Validators.required,Validators.pattern("^(010|011|012|015)[0-9]{8}$") ,Validators.maxLength(11) ,Validators.minLength(11)]),
    address :new FormControl(''),
    nid:new FormControl('',[Validators.required,Validators.pattern("^(2|3)[0-9]{6}(230)[0-9]{4}$"),Validators.minLength(14), Validators.maxLength(14)]),
    }  );
  constructor(private router :Router,private service:ServicesService) { }

  ngOnInit(): void {
    if(localStorage.getItem("userRole")=="admin"){
      this.admin=localStorage.getItem("userInfo")
      this.admin=JSON.parse(this.admin)
      this.imagesrc="https://localhost:7163/api/"+this.admin.imageName+"?t="+new Date().getTime()
      this.today=this.today.toISOString().substring(0,10)
      this.service.get("Admin/GetNumbers/"+this.today).subscribe(
        (res:any)=>{
          this.employeesnumber.doctors=res.numberOfDoctors
          this.employeesnumber.nurses=res.numberOfNurses
          this.employeesnumber.receptionist=res.numberOfReceptionist
          this.employeesnumber.inpatient=res.numberOfInPatients
          this.employeesnumber.outpatient=res.numberOfOutPatients
          this.employeesnumber.todayappointment=res.numberOfTodayAppointments
          this.employeesnumber.allappointment=res.numberOfAllAppointments


        }
      );

     }
     else{
      this.router.navigate(['../home'])
     }
    }
    get adminFirstName(){
      return this.AdminInfo.controls['fname']
    }
    get adminLastName(){
      return this.AdminInfo.controls['lname']
    }
    get adminAge(){
        return this.AdminInfo.controls['age']
        }
    get adminGender(){
      return this.AdminInfo.controls['gender']
      }  
    get adminMail(){
      return this.AdminInfo.controls['mail']
      } 
    get adminPhone(){
      return this.AdminInfo.controls['phonenumber']
      }
    get adminAdress(){
      return this.AdminInfo.controls['address']
    }  
    get adminBloodType() {
      return this.AdminInfo.controls['bloodtype'];
    } 
    get adminNid() {
      return this.AdminInfo.controls['nid'];
    } 
    openmodel(){
      this.AdminInfo.patchValue({ 
        fname:this.admin.firstName,
        lname:this.admin.lastName,
        username:this.admin.userName,
        gender:this.admin.gender,
        age:this.admin.age,
        mail:this.admin.mail,
        nid:this.admin.nationalId,
        bloodtype:this.admin.bloodType,
        phonenumber:this.admin.phoneNumber,
        address :this.admin.address,
        } )
      this.updateflag=true
    }
    close(){
      this.updateflag=false
    }
    update(){
      this.submitted=true
   if(this.AdminInfo.valid){
    this.admin.firstName=this.AdminInfo.controls['fname'].value
    this.admin.lastName=this.AdminInfo.controls['lname'].value
    this.admin.age=parseInt(this.AdminInfo.controls['age'].value)
    this.admin.bloodType=this.AdminInfo.controls['bloodtype'].value
    this.admin.phoneNumber=this.AdminInfo.controls['phonenumber'].value
    this.admin.address=this.AdminInfo.controls['address'].value
    this.admin.gender=this.AdminInfo.controls['gender'].value
    this.admin.mail=this.AdminInfo.controls['mail'].value
    this.admin.nationalId=this.AdminInfo.controls['nid'].value
    this.service.update("Admin/updateAdmin",this.admin).subscribe(
      (res:any)=>{
        setTimeout(() => {
          this.submitted=false
         this.updateflag=false
            this.admin=res
          this.admin.imageName=res.image
          this.admin.image=null
          this.admin.password=null
          this.admin.departmentName=null
          delete this.admin.passwordHash
          delete this.admin.passwordSalt
        localStorage.removeItem("userInfo")
        localStorage.setItem("userInfo",JSON.stringify(this.admin))
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
          let admin=this.admin
          admin.image=this.image
        this.service.update("Admin/updateAdmin",admin).subscribe(
          (res:any)=>{
           delete res.passwordSalt
           delete res.passwordHash
           res.imageName=res.image
           res.image=null
           res.role=null
          res.password=null
          res.departmentName4t6=null
           this.admin=res
           localStorage.removeItem("userInfo")
           localStorage.setItem("userInfo",JSON.stringify(this.admin))
           this.imagesrc="https://localhost:7163/api/"+this.admin.imageName+"?t="+new Date().getTime()
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
