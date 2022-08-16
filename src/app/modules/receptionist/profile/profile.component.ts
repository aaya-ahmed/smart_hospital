import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css',"../../styles/profilestyle2.css"]
})
export class ProfileComponent implements OnInit {
  receptionist:any;
  updateflag:boolean=false
  today:any=new Date();
  image:any
  imagesrc:any
  submitted:boolean=false
  errorflag:boolean=false
  nationalidflag:boolean=false;
  ReceptionistInfo:FormGroup=new FormGroup({
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
  passwordflag: boolean=false;
  userpassword:FormGroup=new FormGroup({
    password:new FormControl('',[Validators.pattern(""),Validators.required,Validators.minLength(8)])
  }  );
  successflag: boolean=false;
  constructor(private service:ServicesService) { }

  ngOnInit(): void {
    if(localStorage.getItem("userInfo")){
      this.receptionist=localStorage.getItem("userInfo")
      this.receptionist=JSON.parse(this.receptionist)
      this.imagesrc="https://smarthospital20220729232305.azurewebsites.net/"+this.receptionist.imageName+"?t="+new Date().getTime()
     }
    }
    get receptionistFirstName(){
      return this.ReceptionistInfo.controls['fname']
    }
    get receptionistLastName(){
      return this.ReceptionistInfo.controls['lname']
    }
    get receptionistAge(){
        return this.ReceptionistInfo.controls['age']
        }
    get receptionistGender(){
      return this.ReceptionistInfo.controls['gender']
      }  
    get receptionistMail(){
      return this.ReceptionistInfo.controls['mail']
      } 
    get receptionistPhone(){
      return this.ReceptionistInfo.controls['phonenumber']
      }
    get receptionistAdress(){
      return this.ReceptionistInfo.controls['address']
    }  
    get receptionistBloodType() {
      return this.ReceptionistInfo.controls['bloodtype'];
    } 
    get receptionistNid() {
      return this.ReceptionistInfo.controls['nid'];
    } 
    get nursepassword(){
      return this.userpassword.controls['password']
      }
    openmodel(){
      this.ReceptionistInfo.patchValue({ 
        fname:this.receptionist.firstName,
        lname:this.receptionist.lastName,
        username:this.receptionist.userName,
        gender:this.receptionist.gender,
        age:this.receptionist.age,
        mail:this.receptionist.mail,
        nid:this.receptionist.nationalId,
        bloodtype:this.receptionist.bloodType,
        phonenumber:this.receptionist.phoneNumber,
        address :this.receptionist.address,
        } )
      this.updateflag=true
    }
    close(){
      this.updateflag=false
    }
    update(){
      this.submitted=true
   if(this.ReceptionistInfo.valid){
    let receptionist=this.receptionist
    receptionist.firstName=this.ReceptionistInfo.controls['fname'].value
    receptionist.lastName=this.ReceptionistInfo.controls['lname'].value
    receptionist.age=parseInt(this.ReceptionistInfo.controls['age'].value)
    receptionist.bloodType=this.ReceptionistInfo.controls['bloodtype'].value
    receptionist.phoneNumber=this.ReceptionistInfo.controls['phonenumber'].value
    receptionist.address=this.ReceptionistInfo.controls['address'].value
    receptionist.gender=this.ReceptionistInfo.controls['gender'].value
    receptionist.mail=this.ReceptionistInfo.controls['mail'].value
    receptionist.nationalId=this.ReceptionistInfo.controls['nid'].value
    this.service.update("Admin/updateReceptionist",receptionist).subscribe(
      (res:any)=>{
        setTimeout(() => {
          this.submitted=false
          this.updateflag=false
          this.receptionist=res
          res.imageName=res.image
          res.image=null
          res.password=null
          res.departmentName=null
          delete res.passwordHash
          delete res.passwordSalt
        this.receptionist=res
        localStorage.removeItem("userInfo")
        localStorage.setItem("userInfo",JSON.stringify(this.receptionist))
        }, 500);

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
          let receptionist=this.receptionist
          receptionist.image=this.image
        this.service.update("Admin/updateReceptionist",receptionist).subscribe(
          (res:any)=>{
           delete res.passwordSalt
           delete res.passwordHash
           res.imageName=res.image
           res.image=null
           res.role=null
          res.password=null
          res.departmentName=null
           this.receptionist=res
           localStorage.removeItem("userInfo")
           localStorage.setItem("Info",JSON.stringify(this.receptionist))
           this.imagesrc="https://smarthospital20220729232305.azurewebsites.net/"+this.receptionist.imageName+"?t="+new Date().getTime()
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
    openpassowordmodel(){
      this.passwordflag=!this.passwordflag
    }
    updatepassword(){
      this.submitted=true
      if(this.userpassword.valid){
        let receptionist=this.receptionist;
        receptionist.password=this.nursepassword.value;
        this.service.update("Admin/updateReceptionist",receptionist).subscribe(
          res=>{
            this.successflag=true;
            setTimeout(() => {
              this.successflag=false;
              this.submitted=false
              this.userpassword.reset()
            }, 500);
  
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
}
