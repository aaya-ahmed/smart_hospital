import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddscanComponent } from './addscan/addscan.component';
import { NewscanComponent } from './newscan/newscan.component';
import { ProfileComponent } from './profile/profile.component';
import { RequestsComponent } from './requests/requests.component';
import { ScanDoctorComponent } from './scan-doctor.component';
import { ScanComponent } from './scan/scan.component';
import { ShowscanComponent } from './showscan/showscan.component';

const routes: Routes = [{ path: '', component: ScanDoctorComponent ,children:[
  {path:'',component:ProfileComponent},
  {path:'profile',component:ProfileComponent},
  {path:'requests',component:RequestsComponent},
  {path:'newscan',component:NewscanComponent},
  {path:'addscan',component:AddscanComponent},
  {path:'scan',component:ScanComponent},
  {path:'showscan',component:ShowscanComponent}
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScanDoctorRoutingModule { }
