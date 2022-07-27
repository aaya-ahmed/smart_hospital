import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NurseRoutingModule } from './nurse-routing.module';
import { NurseComponent } from './nurse.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddVitalSignComponent } from './add-vital-sign/add-vital-sign.component';
import { ShowMedicineComponent } from './show-medicine/show-medicine.component';
import { ReversePatientComponent } from './reverse-patient/reverse-patient.component';
import { InPatientComponent } from './in-patient/in-patient.component';
import { ProfileComponent } from './profile/profile.component';
import { ShowVitalComponent } from './show-vital/show-vital.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    NurseComponent,
    AddVitalSignComponent,
    ShowMedicineComponent,
    ReversePatientComponent,
    InPatientComponent,
    ProfileComponent,
    ShowVitalComponent
  ],
  imports: [
    CommonModule,
    NurseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule 

  ],
  providers: [
   
  ]
})
export class NurseModule { }
