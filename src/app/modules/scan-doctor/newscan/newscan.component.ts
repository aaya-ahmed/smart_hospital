import { Component, OnInit } from '@angular/core';
import { scanList } from 'src/app/models/scan';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-newscan',
  templateUrl: './newscan.component.html',
  styleUrls: ['./newscan.component.css','../../styles/modal.css']
})
export class NewscanComponent implements OnInit {
  scanlist:scanList[]=[]
  temp:scanList={
    id: 0,
    scanName: '',
    scanCharge: 0
  };
  private index:number=0
  p: number = 1;
  totallength:any;
  successflag:boolean=false
  errorflag:boolean=false
  ModuleFlag:boolean=false
  updateflag:boolean=false
  constructor(private scanService:ServicesService) { }

  ngOnInit(): void {
    this.scanService.get('MedicalScan/getAll').subscribe(
      (res:any)=>{
        this.scanlist=res;
        this.totallength=this.scanlist.length
      }
    )
  }
  setupdateinfo(scanObj:scanList,index:number){
    this.temp.id=scanObj.id;
    this.temp.scanName=scanObj.scanName;
    this.temp.scanCharge=scanObj.scanCharge;
    this.ModuleFlag=true;
    this.updateflag=true

  }
  save(form:any){
    if(form.valid){
    if(this.updateflag){
        this.scanService.update('MedicalScan/update',this.temp).subscribe(
          (res:any)=>{
            this.scanlist.splice(this.index,1)
            this.scanlist.push(res);
          }
        )
      }
    else{
        let newscan=
          {
            "scanName":form.value.scanname,
            "scanCharge": form.value.Charge
          }
          this.scanService.post('MedicalScan/add',newscan).subscribe(
            (res:any)=>{
              this.scanlist.push(res)
              this.successflag=true
              setTimeout(() => {
                this.successflag=false
              }, 1000);
            },
            err=>{
              this.errorflag=false;
              setTimeout(() => {
                this.errorflag=false
              }, 1000);
            }
          )
    }}
   

  }
  togglemodalfunc(){
    this.ModuleFlag=!this.ModuleFlag
    this.updateflag=false
  }
}

