import {Component, OnInit, Input} from '@angular/core';
import fr from 'node_modules/fullcalendar/dist/locale/fr.js';

import * as $ from 'jquery';
import * as moment from 'moment';
import 'fullcalendar';

@Component({
  selector: 'app-full-calendar',
  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.css']
})
export class FullCalendarComponent implements OnInit {
  @Input()
  set configurations(config: any) {
    if (config) {
      this.defaultConfigurations = config;
    }
  }

  @Input() eventData: any;

  defaultConfigurations: any;

  constructor() {
    this.eventData = [
      {
        title: 'event1',
        start: moment().subtract(30, 'minutes'),
        end: moment().add(30, 'minutes'),
        rendering: 'background',
        overlap: true,
      },
      {
        title: 'client',
        start: moment().add(60, 'minutes'),
        end: moment().add(90, 'minutes'),
        editable: false,
        overlap: false,
      },
      {
        title: 'pro',
        start: moment().add(30, 'minutes'),
        end: moment().add(60, 'minutes'),
        overlap: false,
        durationEditable: false,
        editable: false,
        color: 'grey',
        textColor: 'black',
      },
    ];

    this.defaultConfigurations = {
      editable: true,
      eventLimit: true,
      locale: fr,
      minTime: '07:00:00',
      maxTime: '21:00:00',
      // businessHours: true,
      businessHours: [ // specify an array instead
        {
          dow: [ 1, 2, 3, 4, 5 ], // Monday, Tuesday, Wednesday, Thursday, Friday
          start: '08:30',
          end: '18:00'
        },
        {
          dow: [ 6 ], // Saturday
          start: '9:00',
          end: '12:30'
        }
      ],
      titleFormat: 'MMM D YYYY',
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      buttonText: {
        today: 'Today',
        month: 'Month',
        week: 'Week',
        day: 'Day'
      },
      defaultView: 'agendaWeek',
      views: {
        agenda: {
          eventLimit: 2
        }
      },
      eventConstraint: 'businessHours',
      allDaySlot: false,
      slotDuration: moment.duration('00:30:00'),
      slotLabelInterval: moment.duration('01:00:00'),
      firstDay: 1,
      selectable: true,
      selectHelper: true,
      // eventSources: [
      //
      //   // your event source
      //   {
      //     events: this.events,
      //     color: 'black',     // an option!
      //     textColor: 'yellow', // an option!
      //     rendering: 'background'
      //   },
      //   {
      //     events: this.events2,
      //     color: 'blue',     // an option!
      //     textColor: 'black' // an option!
      //   },
      //   {
      //     events: this.events3
      //   }
      //
      //   // any other event sources...
      //
      // ]
      events: this.eventData,
      selectConstraint: 'businessHours',
      select: (start, end, jsEvent, view) => {
        if (start.isAfter(moment())) {

          const eventTitle = prompt('Provide Event Title');
          if (eventTitle) {
            $('#calendar').fullCalendar('renderEvent', {
              title: eventTitle,
              start,
              end,
              stick: true
            });
            console.log(start.format('h(:mm)a'), end.format('h(:mm)a'));
            alert('Appointment booked at: ' + start.format('h(:mm)a'));
          }
        } else {
          alert('Cannot book an appointment in the past');
        }
      },
      eventClick: (calEvent, jsEvent, view) => {
        alert('Event: ' + calEvent.title);
      },
      // dayClick: (date, jsEvent, activeView) => {
      //   this.dayClick(date, jsEvent, activeView);
      // },
      eventDragStart: (timeSheetEntry, jsEvent, ui, activeView) => {
        this.eventDragStart(
          timeSheetEntry, jsEvent, ui, activeView);
      },
      eventDragStop: (timeSheetEntry, jsEvent, ui, activeView) => {
        this.eventDragStop(
          timeSheetEntry, jsEvent, ui, activeView
        );
      },

    };
  }

  // dayClick(date, jsEvent, activeView) {
  //   console.log('day click');
  //   console.log(date);
  //   console.log(activeView);
  // }

  eventDragStart(timeSheetEntry, jsEvent, ui, activeView) {
    console.log('event drag start');
  }

  eventDragStop(timeSheetEntry, jsEvent, ui, activeView) {
    console.log('event drag end');
  }

  ngOnInit() {
    $('#full-calendar').fullCalendar(
      this.defaultConfigurations
    );
  }
}
