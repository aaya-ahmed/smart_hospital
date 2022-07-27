import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicalAnalysitRoutingModule } from './medical-analysit-routing.module';
import { MedicalAnalysitComponent } from './medical-analysit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {  HttpClientModule } from '@angular/common/http';
import { ShowAllLabsComponent } from './show-all-labs/show-all-labs.component';
import { AddTestResultComponent } from './add-test-result/add-test-result.component';
import { DynamicLabFormComponent } from './dynamic-lab-form/dynamic-lab-form.component';
import { ShowRequstsComponent } from './show-requsts/show-requsts.component';
import { ShowtestComponent } from './showtest/showtest.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    MedicalAnalysitComponent,
    ShowAllLabsComponent,
    AddTestResultComponent,
    DynamicLabFormComponent,
    ShowRequstsComponent,
    ShowtestComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    MedicalAnalysitRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NgxPaginationModule
  ]
})
export class MedicalAnalysitModule { }
