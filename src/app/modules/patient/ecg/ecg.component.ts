import { Component, OnInit } from '@angular/core';
import { ecgdata } from 'src/app/models/ecg';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-ecg',
  templateUrl: './ecg.component.html',
  styleUrls: ['./ecg.component.css']
})
export class EcgComponent implements OnInit {
  data:ecgdata[]=[]
  constructor(private service:ServicesService) { }
  ngOnInit(): void {
   setInterval(this.getdatat, 30000);
  }
getdatat(){
  this.service.showecg().subscribe(
    (res:any)=>{
      if(this.data.length<=100){
        this.data.push(res)

      }
      else{
        this.data=[]
      }
    }
  )
}
}
