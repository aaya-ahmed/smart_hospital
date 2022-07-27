import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScanDoctorRoutingModule } from './scan-doctor-routing.module';
import { ScanDoctorComponent } from './scan-doctor.component';
import { RequestsComponent } from './requests/requests.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewscanComponent } from './newscan/newscan.component';
import { AddscanComponent } from './addscan/addscan.component';
import { ShowscanComponent } from './showscan/showscan.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfileComponent } from './profile/profile.component';
import { ScanComponent } from './scan/scan.component';


@NgModule({
  declarations: [
    ScanDoctorComponent,
    RequestsComponent,
    NewscanComponent,
    AddscanComponent,
    ShowscanComponent,
    ProfileComponent,
    ScanComponent
    ],
  imports: [
    CommonModule,
    ScanDoctorRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class ScanDoctorModule { }
