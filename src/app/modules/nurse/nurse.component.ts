import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogInAndOutService } from 'src/app/services/log-in-and-out.service';

@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['./nurse.component.css','../styles/mainstyle.css']
})
export class NurseComponent implements OnInit {

  toggle=false;
  profileflag:boolean=true
  reverseflag:boolean=false;
  patientflag:boolean=false
  constructor(private route:Router,private service:LogInAndOutService) { }

  ngOnInit(): void {
    if(localStorage.getItem("userRole")=="nurse"){
    }
    else{this.route.navigate(['../home'])}
  }
  togglebar(){
    this.toggle=!this.toggle;
    }  
    logout(){
      this.service.logout();
      this.route.navigate(['/home'])
    }
    gotohome(){
      this.route.navigate(['/home'])
    }
 
    setreverseflag(){
      this. patientflag=false;
      this.reverseflag=true;
      this.profileflag=false
    }
    setpatientflag(){
      this. patientflag=true;
      this.reverseflag=false;
      this.profileflag=false
    }
    setprofileflag(){
      this. patientflag=false;
      this.reverseflag=false;
      this.profileflag=true
    }

}
