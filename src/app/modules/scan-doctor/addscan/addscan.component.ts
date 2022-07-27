import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-addscan',
  templateUrl: './addscan.component.html',
  styleUrls: ['./addscan.component.css']
})
export class AddscanComponent implements OnInit {
   imagebase64:any;
   image:any;
   imagelist:string[]=['./assets/upload.svg'];
   imageflag=0;
   dateray=new Date().toISOString();
   scan={
    dname:'',
    pname:'',
    date:'',
    scantype:'',
    imagelist:this.imagelist,
    report:''
   }
   constructor(private activeroute:ActivatedRoute) { }
  
    ngOnInit(): void {
      
    }
    
    uploadfile(file:any){
      this.getBase64(file).then(
        data => {
          this.imagebase64=data;
          this.imagebase64=this.imagebase64.split(",").pop();
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
    cancelimage(index:number){
      this.imagelist.splice(index,1);
      if(this.imagelist.length==0){
        this.imagelist.push('./assets/upload.svg')
        this.imageflag=0
      }
    }
    print(ray:any){  
      var pdf = new jsPDF();
      for (let i of this.imagelist){
        pdf.addImage(i,'png',20,10,180,265);
        pdf.addPage()
      }
      pdf.addImage('assets/hospitallogo.png', 'png', 10, 5, 15, 15);
      pdf.text('university hospital',25,15)
      //patient name
      pdf.text('patient name : ',10,30);
      pdf.text(ray.value.pname.toString(),50,30);
      //doctor name
      pdf.text('doctor name : ',10,40);
      pdf.text(ray.value.dname.toString(),50,40);
      //date
      pdf.text('Date : ',100,30);
      pdf.text(this.dateray.substring(0,10),150,30);
      //ray name
      pdf.text('ray name : ',100,40);
      pdf.text(ray.value.scan,150,40);
      //line
      pdf.line(10,60,200,60);
      //report----
      var splitText = pdf.splitTextToSize(ray.value.report, 150);
      var y=70;
      for(var i = 0; i < splitText.length; i++){
        if (y > 275){
            y = 20;
            pdf.addPage();
           }
          pdf.text( splitText[i],20, y);
          y = y + 10
         }
         window.open(pdf.output('bloburl'))?.print()
    }

}
