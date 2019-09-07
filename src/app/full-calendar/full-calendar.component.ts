import {Component, OnInit, Input } from '@angular/core';
import fr from 'node_modules/fullcalendar/dist/locale/fr.js';

import * as $ from 'jquery';
import * as moment from 'moment';
import 'fullcalendar';
import {AgendaService} from "../service/agenda.service";

@Component({
  selector: 'app-full-calendar',
  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.scss']
})
export class FullCalendarComponent implements OnInit {
  @Input()
  set configurations(config: any) {
    if (config) {
      this.defaultConfigurations = config;
    }
  }

  @Input() eventData: any;
  @Input() eventFree: any;

  defaultConfigurations: any;

  constructor(public agendaService: AgendaService) {
    this.eventData = [];
    this.eventFree = [];

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
      // progressiveEventRendering: true,
      // this.eventData = [
      //   {
      //     title: 'event1',
      //     start: moment().subtract(30, 'minutes'),
      //     end: moment().add(30, 'minutes'),
      //     rendering: 'background',
      //     overlap: true,
      //   },
      //   {
      //     title: 'client',
      //     start: moment().add(60, 'minutes'),
      //     end: moment().add(90, 'minutes'),
      //     editable: false,
      //     overlap: false,
      //   },
      //   {
      //     title: 'pro',
      //     start: moment().add(30, 'minutes'),
      //     end: moment().add(60, 'minutes'),
      //     overlap: false,
      //     durationEditable: false,
      //     editable: false,
      //     color: 'grey',
      //     textColor: 'black',
      //   },
      // ];
      eventSources: [

        // your event source
        {
          events: this.eventData,
          color: 'black',     // an option!
          textColor: 'yellow', // an option!
          overlap: false,
          durationEditable: false,
          editable: false,
        },
        {
          events: this.eventFree,
          color: 'green',     // an option!
          textColor: 'black', // an option!
          rendering: 'background',
          overlap: true,
        }
        // {
        //   events: this.events3
        // }

        // any other event sources...

      ],
      // events: this.eventData,
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
            const event = {
              title: eventTitle,
              start: start,
              end: end,
            };
            agendaService.setNewEvent(event);
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


    this.agendaService.listEventEmitter.subscribe(() => {
      console.log(this.agendaService.listEvents);
      this.reloadCalendar();
    });
  }

  private reloadCalendar(): void {
    // this.eventData = []; <== le problème venais de là !!
    for (const el of this.agendaService.listEvents){
      // add event from API
      this.eventData.push({
        title: el.summary,
        start: el.start.dateTime,
        end: el.end.dateTime,
      });
    }
    // add freetime from API
    for (const el of this.agendaService.listFreeTime){
      this.eventFree.push(
        {
          title: 'free',
          start: el.start,
          end: el.end,
        }
      );
    }
    $('#full-calendar').fullCalendar(
      this.defaultConfigurations
    );
    console.log(this.eventData);
    console.log(this.eventFree);
  }


    // $('#full-calendar').fullCalendar(
    //   this.defaultConfigurations

}
