import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';
@Component({
  selector: 'app-show-all-labs',
  templateUrl: './show-all-labs.component.html',
  styleUrls: ['./show-all-labs.component.css','../../styles/modal.css']
})
export class ShowAllLabsComponent implements OnInit {
  numflag=false;
  catflag=false;
  alltests:any;
  testInfo:any;
  labName:string='';
  oldCharge:number=0;
  errorflag:boolean=false
  successflag:boolean=false
  noParamtersflag=false;
  deleteMess=false;
  deletTestId=0;
  ModuleFlag:boolean=false
  updateflag:boolean=false
  totallength=0;
  constructor(private service:ServicesService,private _router:Router) { }
  ngOnInit(): void {
    this.service.getTestNames().subscribe(
      (res:any)=>{
        this.alltests=res;
        this.totallength=this.alltests.length
      });
    // on the begning the length of formGroup "numericalParamters" is 1 so if i don't press in add new paramter
    //button formGroup still has empty object which can send it to backend
    if(!this.numflag)
    {
      this.deleteNumericalParamter(0);
    }
    if(!this.catflag)
    {
      this.deleteCategoricalParamters(0);
    }
  }
  addLabGroup:FormGroup=new FormGroup({
    testName:new FormControl('',[Validators.required,Validators.minLength(2)]),
    testCharge:new FormControl(null,[Validators.required,(Validators.pattern("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$"))]),
    numericalParamters:new FormArray([
      new FormGroup({
        testParameterName:new FormControl('',[Validators.required,Validators.minLength(2)]),
        fieldType:new FormControl(''),
        inputPattern: new FormControl(''),
        unit:new FormControl(''),
        min_Range:new FormControl(null,[Validators.required,Validators.pattern("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$")]),
        max_Range:new FormControl(null,[Validators.required,Validators.pattern("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$")])
      })
    ]),
    categoricalParamters:new FormArray([
      new FormGroup({
        testParameterName:new FormControl('',[Validators.required,Validators.minLength(2)]),
        fieldType:new FormControl(''),
        inputPattern: new FormControl(''),
        unit:new FormControl(''),
        normalvalue:new FormControl('',[Validators.required])
        
      })
    ])
  });
 updatingTestInfo:FormGroup=new FormGroup({
    newcharge:new FormControl(null,[Validators.required,Validators.pattern("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$")])
  });
  
  get numericalParamters(){
   return this.addLabGroup.get('numericalParamters') as FormArray;
  }
  addNumericalParamters(){
    //if condition to display only one row on my first click on add button
    this.numflag=true;
   if(this.numflag)
  { 
    
    this.numericalParamters.push(
      new FormGroup({
        testParameterName:new FormControl('',[Validators.required,Validators.minLength(2)]),
        fieldType:new FormControl(''),
        inputPattern: new FormControl(''),
        unit:new FormControl(''),
        min_Range:new FormControl(null,[Validators.required,Validators.pattern("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$")]),
        max_Range:new FormControl(null,[Validators.required,Validators.pattern("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$")])
      })
   );
  }
}
  deleteNumericalParamter(index:any){
    this. numericalParamters.removeAt(index);
  }
  get categoricalParamters(){
    return this.addLabGroup.get('categoricalParamters') as FormArray;
   }
  get testName(){
    return this.addLabGroup.get('testName');
  } 
  get testCharge(){
    return this.addLabGroup.get('testCharge');
  }
  addcategoricalParamters(){
    this.catflag=true;
    if(this.catflag)
    {
      this.categoricalParamters.push(
      new FormGroup({
        testParameterName:new FormControl('',[Validators.required,Validators.minLength(2)]),
        fieldType:new FormControl(''),
        inputPattern: new FormControl(''),
        unit:new FormControl(''),
        normalvalue:new FormControl('',[Validators.required])     
      })
    );}
   
  }
  deleteCategoricalParamters(index:any){
    this. categoricalParamters.removeAt(index);
  }
  addLab(){
    if(this.numericalParamters.value.length>0 || this.categoricalParamters.value.length>0)
    {
      this.noParamtersflag=false;
      if(this.addLabGroup.valid){
      let testData:any={
        'name':this.testName?.value,
        'testCharge':this.testCharge?.value,
        'categoricalParamters':this.categoricalParamters.value,
        'numericalParamters':this.numericalParamters.value
      };
        this.service.post('MedicalTest/add',testData).subscribe(
          res=>{
            this.alltests.push(testData);
            this.successflag=true
            setTimeout(() => {
              this.successflag=false
            }, 2000);
           
         },
           (err:any)=>{
             this.errorflag=true
             setTimeout(() => {
               this.errorflag=false
             }, 2000);
           });
    }
    else{
      this.noParamtersflag=true
       setTimeout(() => {
         this.noParamtersflag=false
       }, 2000);
    }
  }
}
  getTestInfo(testId:any){    
    this.oldCharge=0;
    this.service.get('MedicalTest/getById/'+testId).subscribe(res=>
      {        
        this.testInfo=res;
        this.labName=this.testInfo.name;
        this.oldCharge=this.testInfo.testCharge;
      });
      this.ModuleFlag=true;
      this.updateflag=true
  }
  
updateTestInfo(){
   if(this.updatingTestInfo.valid)
   {
    let updatedData:any={
      id:this.testInfo.id,
      name:this.testInfo.name,
      testCharge:parseInt(this.updatingTestInfo.get('newcharge')?.value),
      categoricalParamters:this.testInfo.categoricalParamters,
      numericalParamters:this.testInfo.numericalParamters
    }    
    this.service.update('MedicalTest/update',updatedData).subscribe(
      (res:any)=>{
       this.successflag=true
       setTimeout(() => {
         this.successflag=false
       }, 2000);
      window.location.reload();
    },
      (err:any)=>{
        this.errorflag=true
        setTimeout(() => {
          this.errorflag=false
        }, 2000);
      });
  }
  }
  deleteTest(testId:number){
    this.deletTestId=testId
    this.deleteMess=true;
  } 
  ensureDeletingTest(){
    this.service.delete('MedicalTest/delete/'+this.deletTestId)
  }
  close(){
    this.deleteMess=false;
  }
  togglemodalfunc(){
    this.ModuleFlag=!this.ModuleFlag
    this.updateflag=false
  }
}
