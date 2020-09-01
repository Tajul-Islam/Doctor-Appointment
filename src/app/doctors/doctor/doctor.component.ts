import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DoctorService} from '../../shared/doctor.service';
import { NgForm } from '@angular/forms';

import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  @ViewChild('f', { static: false }) appointmentForm: NgForm;
  appointmentDetails = {
    timeSlot: '',
    fullname: '',
    phonenumber: '',
    visitreason: ''
  };
  doctor: any;
  doctorName: string;
  selectedDate: string;
  showAppointment = false;
  confirmAppointment = false;
  showTimeSlot = true;
  showAppointmentForm = false;
  doctorScheduleRange: any;
  visitTimeSlot: string[] = [];
  INITIAL_EVENTS: EventInput[] = [];
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'next today',
      center: 'title',
      right: 'dayGridMonth'
    },
    initialView: 'dayGridMonth',
    initialEvents: this.INITIAL_EVENTS,
    eventClick: this.handleEventClick.bind(this)
  };
  constructor(private route: ActivatedRoute, private doctorService: DoctorService, private router: Router) {
  }

  ngOnInit(): void {
    this.doctorName = this.route.snapshot.params['name'];
    this.doctor = this.doctorService.getDoctor(this.doctorName);
    const doctorSchedule = this.doctor.availibility;
    const days: number[] = [];
    Object.keys(doctorSchedule).map(function(key){
      if (key === 'sun') {
        days.push(0);
      } else if (key === 'mon'){
        days.push(1);
      }else if (key === 'tue'){
        days.push(2);
      }else if (key === 'wed'){
        days.push(3);
      }else if (key === 'thu'){
        days.push(4);
      }else if (key === 'fri'){
        days.push(5);
      }else{
        days.push(6);
      }
    });
    this.INITIAL_EVENTS.push({
      title: 'Available',
      daysOfWeek: days,
      display: 'background'
    });
  }
  handleEventClick(clickInfo: EventClickArg) {
    this.selectedDate = clickInfo.event.startStr;
    const date = moment(this.selectedDate);
    const selectDay = date.day();
    if (selectDay === 0) {
      this.doctorScheduleRange = this.doctor.availibility.sun;
    }else if (selectDay === 1) {
      this.doctorScheduleRange = this.doctor.availibility.mon;
    }else if (selectDay === 2) {
      this.doctorScheduleRange = this.doctor.availibility.tue;
    }else if (selectDay === 3) {
      this.doctorScheduleRange = this.doctor.availibility.wed;
    }else if (selectDay === 4) {
      this.doctorScheduleRange = this.doctor.availibility.thu;
    }else if (selectDay === 5) {
      this.doctorScheduleRange = this.doctor.availibility.fri;
    }else{
      this.doctorScheduleRange = this.doctor.availibility.sat;
    }
    this.showAppointment = true;
    let startTime = moment(this.doctorScheduleRange.split('-')[0], ["hh:mm A"]).format("hh:mm A");
    const endTime = moment(this.doctorScheduleRange.split('-')[1], ["hh:mm A"]).format("hh:mm A");
    const durationInMinutes = this.doctor.visitDurationInMin;
    let  range = '';
    while (range !== endTime) {
      range = moment(startTime, ["hh:mm A"]).add(durationInMinutes, 'minutes').format('hh:mm A');
      const newRange = (startTime + ' - ' + range );
      this.visitTimeSlot.push(newRange);
      startTime = range;
      if (range === endTime){
        break;
      }
    }
  }
  cancelAppointmentHandler(){
    this.selectedDate = '';
    this.showAppointment = false;
    this.visitTimeSlot = [];
  }
  continueAppointmentHandler(){
    this.showTimeSlot = false;
    this.appointmentDetails.timeSlot = this.appointmentForm.value.timeSlot;
    this.showAppointmentForm = true;
  }
  confirmAppointmentHandler(){
    this.confirmAppointment = true;
    this.appointmentDetails.fullname = this.appointmentForm.value.fullname;
    this.appointmentDetails.phonenumber = this.appointmentForm.value.phonenumber;
    this.appointmentDetails.visitreason = this.appointmentForm.value.visitreason;
  }
  cancelAppointmentViewHandler(){
    this.router.navigate(['/',]);
  }

}
