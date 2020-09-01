import { Component, OnInit } from '@angular/core';
import {DoctorService} from '../shared/doctor.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  doctorList: any;
  constructor(private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.doctorList = this.doctorService.doctors;
  }

}
