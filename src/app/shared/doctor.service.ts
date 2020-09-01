import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  doctors = [
    {
      "name":"Dr. John Doe",
      "org":"Kings London Hospital",
      "availibility":{
        "sun":"10:00 AM - 06:00 PM",
        "wed":"06:00 PM - 09:00 PM"
      },
      "visitDurationInMin":15
    },
    {
      "name":"Dr. Mary Ellis",
      "org":"ABC Hospital",
      "availibility":{
        "sun":"10:00 AM - 06:00 PM",
        "mon":"09:00 PM - 11:00 PM",
        "thu":"11:00 AM - 02:00 PM"
      },
      "visitDurationInMin":15
    }

  ];
  constructor() { }

  getDoctor(name: string) {
    const doctor = this.doctors.find(
      (d) => {
        return d.name === name;
      }
    );
    return doctor;
  }

}
