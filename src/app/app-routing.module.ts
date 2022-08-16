import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './maincomponent/home/home.component';
import { LoginComponent } from './maincomponent/login/login.component';
import { RegComponent } from './maincomponent/reg/reg.component';

const routes: Routes = [
   {path:'smart_hospital/',component:HomeComponent},
   {path:'smart_hospital/home',component:HomeComponent},
   {path:'login',component:LoginComponent},
   {path:'reg',component:RegComponent},{path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
   {path:'doctor', loadChildren: () => import('./modules/doctor/doctor.module').then(m => m.DoctorModule) },
   {path:'nurse', loadChildren: () => import('./modules/nurse/nurse.module').then(m => m.NurseModule) },
   {path:'receptionist', loadChildren: () => import('./modules/receptionist/receptionist.module').then(m => m.ReceptionistModule) },
   {path:'lab doctor', loadChildren: () => import('./modules/medical-analysit/medical-analysit.module').then(m => m.MedicalAnalysitModule) },
   {path:'scan doctor', loadChildren: () => import('./modules/scan-doctor/scan-doctor.module').then(m => m.ScanDoctorModule) },
   {path:'patient', loadChildren: () => import('./modules/patient/patient.module').then(m => m.PatientModule) }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
