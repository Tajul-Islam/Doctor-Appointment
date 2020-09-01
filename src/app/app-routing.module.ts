import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DoctorsComponent} from './doctors/doctors.component';
import {DoctorComponent} from './doctors/doctor/doctor.component';

const routes: Routes = [
  {path: '', component: DoctorsComponent},
  {path: 'doctor/:name', component: DoctorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
