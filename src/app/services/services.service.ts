import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { list_department } from '../models/department';
import { alldoctors } from '../models/doctors';
import { ecgdata } from '../models/ecg';
import { labsList } from '../models/lab';
import { inpatient } from '../models/patient';
import { requestvital, showvitalnurse } from '../models/vital-sign';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
 //private url:string="http://192.168.181.252:5050/api/";
  private url:string="https://smarthospital20220729232305.azurewebsites.net/api/";
  private aiurl:string="http://127.0.0.1:5000/predict_ecg"
  private usertoken:any
  constructor(private http:HttpClient) {}
  post(controller:string,object:any){
    this.usertoken=localStorage.getItem("userToken")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.usertoken}`);
    return this.http.post(this.url+controller,object,{ headers: headers })
  }
  get(controller:string){
    this.usertoken=localStorage.getItem("userToken")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.usertoken}`);
    return this.http.get(this.url+controller,{ headers: headers })
  }
  getalldoctorswithdepartmet():Observable<alldoctors[]>{
    this.usertoken=localStorage.getItem("userToken")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.usertoken}`);
    return this.http.get<alldoctors[]>(this.url+"Departments/getAllEmps",{ headers: headers }).pipe(
      map((res:alldoctors[])=>{
        return res.map(responce=>({
          departmentId:responce.departmentId ,
          departmentName:responce.departmentName,
          doctorDtos:responce.doctorDtos}
          ))
        }
      )
    )
  } 
  getdepartments():Observable<list_department[]>{
    this.usertoken=localStorage.getItem("userToken")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.usertoken}`);
    return this.http.get<list_department[]>(this.url+"Departments/getAll", { headers: headers }).pipe(
        map((res:list_department[])=>{
          return res.map(responce=>({
            departmentId:responce.departmentId,
            departmentName:responce.departmentName,
            isClinical:responce.isClinical
          }))
        }
        )
        )
  
    }
    getTestNames():Observable<labsList[]>{
      this.usertoken=localStorage.getItem("userToken")
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.usertoken}`);
        return this.http.get<labsList[]>(this.url+"MedicalTest/getAll", { headers: headers }).pipe(
        map((tests:labsList[])=>{
          return tests.map(test=>({
           id:test.id,
           name:test.name,
           testCharge:test.testCharge
          }))
        })
      );
        
    }
    getvital(param:requestvital){
      this.usertoken=localStorage.getItem("userToken")
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.usertoken}`);
        return this.http.get<showvitalnurse[]>(this.url+"GetVitalSignesByRangeOfDate/"+param.patientID+
                                                               "/"+param.StartDate+
                                                               "/"+param.EndDate, { headers: headers })
    }
  update(controller:string,object:any){
    this.usertoken=localStorage.getItem("userToken")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.usertoken}`);
    return this.http.put(this.url+controller,object, { headers: headers })
  }
  updatewithoutbody(controller:string){
    this.usertoken=localStorage.getItem("userToken")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.usertoken}`);
    return this.http.put(this.url+controller,null, { headers: headers })
  }
  delete(controller:string){
    this.usertoken=localStorage.getItem("userToken")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.usertoken}`);
    return this.http.delete(this.url+controller, { headers: headers })
  }
getindoorpatient(id:number):Observable<inpatient[]>{
  this.usertoken=localStorage.getItem("userToken")
  const headers = new HttpHeaders().set('Authorization', `Bearer ${this.usertoken}`);
  return this.http.get<inpatient[]>(this.url+"Patient/GetInDoorPatients/"+id, { headers: headers })
    .pipe(
        map((res:any[])=>{
          return res.map(responce=>({
            patientName:responce.firstName +""+responce.lastName,
            patientId: responce.id,
            indoorPatientRecordId: responce.indoorPatientId,
            age:responce.age,
            gender: responce.gender,
            causeOfAdmission: responce.causeOfAdmission,
            oralMedicalHistory: responce.oralMedicalHistory,
            enterDate: responce.enterDate,
            room_Number: responce.room_Number,
            bedNumber: responce.bedNumber,
            floor_Number: responce.floor_Number
          }))
        }
        )
        )
}
showecg():Observable<ecgdata>{
  return this.http.get<ecgdata>(this.aiurl).pipe(
     map((res:any)=>{
       return res.map((responce:ecgdata)=>({
         prediction:responce.prediction ,
         precentage:responce.precentage,
         date:responce.date}
         ))
     }))
 }
}
