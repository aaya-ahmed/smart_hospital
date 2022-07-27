import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoricalParamter, NumericalParamter, NumericalDetail, CategoricalDetail } from 'src/app/models/lab';
import { ServicesService } from 'src/app/services/services.service';



@Component({
  selector: 'app-dynamic-lab-form',
  templateUrl: './dynamic-lab-form.component.html',
  styleUrls: ['./dynamic-lab-form.component.css']
})
export class DynamicLabFormComponent implements OnInit {
  constructor(private service:ServicesService ) { }
  date=new Date()
  today=this.date.toISOString().substring(0,10);
  errormes:string='';
  flag=false;
  labname:string='';
  dynamicData:any;
  numericalTestValue:number=0;
  categoricalTestValue:string="";
  catParam:CategoricalParamter[]=[];
  numParam:NumericalParamter[]=[];
  paramterValue:string="";
  numDetails:NumericalDetail[]=[];
  catDetails:CategoricalDetail[]=[];
  myForm :FormGroup=new FormGroup({});
  ngOnInit(): void { 
    this.service.get('MedicalTest/getAll').subscribe(
      (res:any)=>
     {this.dynamicData=res;});
    }
setLabName(labname:any){
    this.labname=labname.target.value;
    this.catParam=[];
    this.numParam=[];
    this.flag=false;
    for(let i of this.dynamicData)
    {
      if(i.name===this.labname){
        for(let num of i.numericalParamters)
        {
          this.myForm.addControl(num.testParameterName, new FormControl('',[Validators.required,
          Validators.pattern("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$")]));        
        }
        for(let cat of i.categoricalParamters)
        {
           this.myForm.addControl(cat.testParameterName, new FormControl('',[Validators.required,
            Validators.pattern("[a-zA-Z]")]));    
        }
        this.catParam=i.categoricalParamters;
        this.numParam=i.numericalParamters;
        this.flag=true;
      }
    }
  }
  printlab(){
    window.print();
  }
}


