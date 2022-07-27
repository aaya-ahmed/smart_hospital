import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVitalSignComponent } from './add-vital-sign/add-vital-sign.component';
import { InPatientComponent } from './in-patient/in-patient.component';
import { NurseComponent } from './nurse.component';
import { ProfileComponent } from './profile/profile.component';
import { ReversePatientComponent } from './reverse-patient/reverse-patient.component';
import { ShowMedicineComponent } from './show-medicine/show-medicine.component';
import { ShowVitalComponent } from './show-vital/show-vital.component';

const routes: Routes = [
  { path: '', component:NurseComponent,children: [
    {path:"",component:ProfileComponent},
    {path:"profile",component:ProfileComponent},
   {path:'AddVitalSigns',component:AddVitalSignComponent},
   {path:'ShowVitalSigns',component:ShowVitalComponent},
   {path:'checkmedicine',component:ShowMedicineComponent},
   {path:"patient-rereverstion",component:ReversePatientComponent},
   {path:"in-patient",component:InPatientComponent}
  ]}

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NurseRoutingModule { }
