import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { image, patientscan, requestlist } from 'src/app/models/scan';
import { ServicesService } from 'src/app/services/services.service';
import { ShardserviceService } from 'src/app/services/shardservice.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {
  scan:patientscan=
    {
      scanRequestId: 0,
      scanImages:[],
      writtenReport:'',
      scanDate:'',
      indoorPatientRecordId: 0
    }
  request:requestlist={
    id: 0,
    scanName: '',
    scanId: 0,
    createdDtm: '',
    patientId: 0,
    doctorId:0,
    patientName: '',
    doctorName: '',
    indoorPatientRecordId: 0
  }
  imagescanlist:image[]=[]
  submitflag:boolean=false
  successstate:boolean=false
  faildstate:boolean=false
  dateray=new Date()
  imagebase64:any;
  image:any;
  imagelist:string[]=['./assets/upload.svg'];
  imageflag:number=0
  submitted:boolean=false
  constructor(private shared:ShardserviceService,private service:ServicesService,private router:Router) { }
  ngOnInit(): void {
    this.request=this.shared.request
    if(this.request.id==0){
      this.router.navigateByUrl('scan doctor/profile')
    }
  }
  uploadfile(file:any){
    this.getBase64(file).then(
      data => {
        this.imagebase64=data;
        this.imagebase64=this.imagebase64.split(",").pop();
        this.imagescanlist.push({content:this.imagebase64})
         });
  }
  getBase64(file:any) {
    if(file.target.files[0]){
      var reader=new FileReader();
      reader.readAsDataURL(file.target.files[0])
      reader.onload=(e=file)=>{
        this.image=e.target?.result
        if(this.imageflag==0){
        this.imagelist.pop();
        this.imageflag=1;
      }
        this.imagelist.push(this.image);
      }
    }
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      reader.onload = () =>{ resolve(reader.result)};
      reader.onerror = error => reject(error);
    });
  }
  cancel(){
    this.router.navigateByUrl('scan doctor/profile')
  }
  cancelimage(index:number){
    this.imagelist.splice(index,1);
    this.scan.scanImages.splice(index,1)
    if(this.imagelist.length==0){
      this.imagelist.push('./assets/upload.svg')
      this.imageflag=0
    }
  }
  submit(ray:any){
    this.submitted=true
    if(ray.valid){
      this.scan.scanRequestId=this.request.id
      this.scan.scanDate=this.dateray.toISOString().substring(0,10)
      this.scan.writtenReport=ray.value.report
      this.scan.indoorPatientRecordId=this.request.indoorPatientRecordId
      this.scan.scanImages=this.imagescanlist
      this.service.post("MedicalScan/addPatientScan",this.scan).subscribe(
        res=>{
          this.submitted=false;
          this.successstate=true
          this.imagescanlist=[]
          this.imagelist=[]
          this.imagelist.push('./assets/upload.svg');
          setTimeout(() => {
            this.successstate=false
            ray.reset()
          }, 1000);
        },
        err=>{
          this.submitted=false;
          this.faildstate=true
          setTimeout(() => {
            this.faildstate=false
            ray.reset()
          }, 1000);
        }
      )
      
    }
  }
}
