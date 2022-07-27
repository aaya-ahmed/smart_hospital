import { Injectable } from '@angular/core';
import { getAllLabRequsts } from '../models/lab';
import { requestlist } from '../models/scan';

@Injectable({
  providedIn: 'root'
})
export class ShardserviceService {
  private requests:requestlist={
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
  private user:any={
      patientid:0,
      patientname:'',
      nurseid:0,
      nursename:'',
      patientage:0,
      indoorPatientId:0
    }
    private requsts:getAllLabRequsts=
    {id:0,
     labName:'',
     testId: 0,
     createdDtm: '',
     patientId: 0,
     doctorId: 0,
     patientName: '',
     doctorName: '',
     indoorPatientRecordId:0
    }
  constructor() { }
  set request(request:requestlist){
    this.requests=request
  }
  get request(){
    return this.requests
  }
  set userinfo(userinfo:any){
    this.user=userinfo
  }
  get userinfo(){
    return this.user
  }
  set testrequest(request:getAllLabRequsts){
    this.requsts=request
  }
  get testrequest(){
    return this.requsts
  }
}
