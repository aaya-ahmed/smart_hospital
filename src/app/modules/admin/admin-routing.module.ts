import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { EmployeesComponent } from './employees/employees.component';
import { SchaduleComponent } from './schadule/schadule.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DoctorComponent } from './doctor/doctor.component';
import { NurseComponent } from './nurse/nurse.component';
import { SetschaduleComponent } from './setschadule/setschadule.component';
import { SeatBedsComponent } from './seat-beds/seat-beds.component';
import { ProfileComponent } from './profile/profile.component';



const routes: Routes = [
  { path: '', component: AdminComponent,children: [
    {path: '', component: ProfileComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'doctorcom', component:DoctorComponent},
    {path: 'nurseing', component:NurseComponent},
    {path:'employees',component:EmployeesComponent},
    {path:'schadule',component:SchaduleComponent},
    {path:'departments',component:DepartmentsComponent},
    {path:'setschadule',component:SetschaduleComponent},
    {path:'setbed',component:SeatBedsComponent}
  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
