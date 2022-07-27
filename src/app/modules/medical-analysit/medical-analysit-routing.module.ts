import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTestResultComponent } from './add-test-result/add-test-result.component';
import { DynamicLabFormComponent } from './dynamic-lab-form/dynamic-lab-form.component';
import { MedicalAnalysitComponent } from './medical-analysit.component';
import { ProfileComponent } from './profile/profile.component';
import { ShowAllLabsComponent } from './show-all-labs/show-all-labs.component';
import { ShowRequstsComponent } from './show-requsts/show-requsts.component';
import { ShowtestComponent } from './showtest/showtest.component';

const routes: Routes = [{ path: '', component: MedicalAnalysitComponent ,children:[
  
  {path:'',component:ProfileComponent},
  {path:'profile',component:ProfileComponent},
  {path:'requests',component:ShowRequstsComponent},
  {path:'newtest',component:ShowAllLabsComponent},
  {path:'addtest',component:DynamicLabFormComponent},
  {path:'showtest',component:ShowtestComponent},
  {path:'test',component:AddTestResultComponent}
  
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalAnalysitRoutingModule { }
