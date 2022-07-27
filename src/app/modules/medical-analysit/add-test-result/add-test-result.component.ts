import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoricalParamter, NumericalParamter, NumericalDetail, CategoricalDetail, resultData, getAllLabRequsts } from 'src/app/models/lab';
import { ServicesService } from 'src/app/services/services.service';
import { ShardserviceService } from 'src/app/services/shardservice.service';

@Component({
  selector: 'app-add-test-result',
  templateUrl: './add-test-result.component.html',
  styleUrls: ['./add-test-result.component.css']
})
export class AddTestResultComponent implements OnInit {
  date=new Date().toISOString();
// today=this.date.toISOString().substring(0,8)+this.date.getDate();
  errormes:string='';
  labRecord:any;
  patGender:string='';
  patAge=0;
  patPhone='';
  testSubmitted:boolean=false;
  testNotSubmitted:boolean=true;
  numericalTestValue:number=0;
  categoricalTestValue:string="";
  catParam:CategoricalParamter[]=[];
  numParam:NumericalParamter[]=[];
  paramterValue:string="";
  numDetails:NumericalDetail[]=[];
  catDetails:CategoricalDetail[]=[];
  myForm :FormGroup=new FormGroup({});
  request:getAllLabRequsts={
    id: 0,
    labName:'',
    testId: 0,
    createdDtm: '',
    patientId: 0,
    doctorId: 0,
    patientName: '',
    doctorName: '',
    indoorPatientRecordId:0};
  constructor(private shared:ShardserviceService,private service:ServicesService,private router:Router) { }
  ngOnInit(): void { 
    this.request=this.shared.testrequest
    if(this.request.id==0){
      this.router.navigateByUrl('lab doctor/profile')
    }
    this.service.get("Patient/"+this.request.patientId).subscribe(
      (res:any)=>
      {
        // make those variables to can acess in htmlfile
        this.patGender=res.gender;
        this.patAge=res.age;
        this.patPhone=res.phoneNumber;
      });
    this.service.get("MedicalTest/getById/"+this.request.testId).subscribe(
      (res:any)=>{
      this.labRecord=res;
      for(let num of this.labRecord.numericalParamters)
      {
        this.myForm.addControl(num.testParameterName, new FormControl('',[Validators.required,
          Validators.pattern("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$")]));           
      }
      for(let cat of this.labRecord.categoricalParamters)
      {
        this.myForm.addControl(cat.testParameterName, new FormControl('',[Validators.required,
          Validators.pattern('[a-zA-z]*')]));    
      }
    this.catParam=this.labRecord.categoricalParamters;
    this.numParam=this.labRecord.numericalParamters;});
}
paramtersvalue(){
     let numcounter=0;
     let catcounter=0;
     this.numDetails=[];
     this.catDetails=[];
    //loop in formcontrolnames(paramtersNames)    
    for(let i in this.myForm.controls )
    {
     //compare formcontrolname with numeric paramters names
     if(this.numParam.length>0)
     {
      if(i==this.numParam[numcounter].testParameterName)
      {
       this.numericalTestValue=parseInt(this.myForm.controls[i].value)
       let numDetails:any={
        'testParameterId':this.numParam[numcounter].id,
        'numericalValue':this.numericalTestValue
        }
        this.numDetails.push(numDetails);
        numcounter=numcounter+1;
      }
    }
    if(this.catParam.length>0){
       if(i==this.catParam[catcounter].testParameterName)
      {
      this.categoricalTestValue=this.myForm.controls[i].value
       let catDetails:any={
        'testParameterId':this.catParam[catcounter].id,
        'measuredValue':this.categoricalTestValue
        }
        this.catDetails.push(catDetails);
        catcounter=catcounter+1;
      }
    
   }
  }
   if(this.myForm.valid)
   {
    
    let resultTestData:any=
    { 
      'labRequestId':this.request.id,
      'categoricalDetails':this.catDetails,
      'numericalDetails':this.numDetails,
      'testDate':this.date,
      'indoorPatientRecordId':this.request.indoorPatientRecordId
  
    }  
  this.service.post("MedicalTest/addPatientTest",resultTestData).subscribe(
    res=>{
      this.testSubmitted=true;
    }
    );
}}
reload(){
  this.router.navigate(['lab doctor/profile'])
}
}
