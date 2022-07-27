import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { EmployeesComponent } from './employees/employees.component';
import { SchaduleComponent } from './schadule/schadule.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DoctorComponent } from './doctor/doctor.component';
import { NurseComponent } from './nurse/nurse.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { SetschaduleComponent } from './setschadule/setschadule.component';
import { ShowschaduleComponent } from './showschadule/showschadule.component'; 
import { SeatBedsComponent } from './seat-beds/seat-beds.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AdminComponent,
    EmployeesComponent,
    SchaduleComponent,
    DepartmentsComponent,
    DoctorComponent,
    NurseComponent,
    SetschaduleComponent,
    ShowschaduleComponent,
    SeatBedsComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule   ]
})
export class AdminModule { }
